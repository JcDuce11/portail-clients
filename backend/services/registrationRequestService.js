const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db = require("../config/db");
const {
  sendVerificationEmail
} = require(
  "./emailService"
);

async function createRegistrationRequest(
  data
) {

console.log(
  "CREATE REGISTRATION REQUEST"
);

console.log(data);
  
  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const validationToken =
    crypto.randomUUID();

  const language =
  data.language || "fr";

  const validationExpires =
    new Date(
      Date.now() +
      24 * 60 * 60 * 1000
    );

  const [result] =
    await db.execute(
      `
      INSERT INTO registration_requests (

        firstname,
        lastname,

        mobile,
        phone,

        email,
        password_hash,

        company_name,
        site_name,

        address,
        postal_code,
        city,
        country,

        company_id,
        site_id,

        request_type,

        status,

        email_verified,

        validation_token,
        validation_expires

      )

      VALUES (

        ?, ?,

        ?, ?,

        ?, ?,

        ?, ?,

        ?, ?, ?, ?,

        ?, ?,

        ?,

        'PENDING_EMAIL',

        0,

        ?,
        ?

      )
      `,
      [

        data.firstname,
        data.lastname,

        data.mobile,
        data.phone,

        data.email,
        passwordHash,

        data.company_name,
        data.site_name,

        data.address,
        data.postal_code,
        data.city,
        data.country,

        data.company_id,
        data.site_id,

        data.request_type,

        validationToken,
        validationExpires

      ]
    );

console.log(
  "SENDING VERIFICATION EMAIL"
);

await sendVerificationEmail(

  data.email,

  language,

  validationToken

);

console.log(
  "VERIFICATION EMAIL SENT TO:",
  data.email
);

console.log(
  "TOKEN:",
  validationToken
);

console.log(
  "MYSQL INSERT OK"
);

console.log(
  result
);

  return {

    requestId:
      result.insertId,

    validationToken

  };

}

async function verifyEmailToken(
  token
) {

  const [rows] =
    await db.execute(
      `
      SELECT *
      FROM registration_requests
      WHERE validation_token = ?
      `,
      [token]
    );

  if (
    rows.length === 0
  ) {

    return {
      success: false,
      errorCode:
        "TOKEN_INVALID"
    };

  }

  const request =
    rows[0];

  if (
    request.email_verified === 1
  ) {

    return {
      success: false,
      errorCode:
        "TOKEN_ALREADY_USED"
    };

  }

  if (
    request.validation_expires &&
    new Date(
      request.validation_expires
    ) < new Date()
  ) {

    return {
      success: false,
      errorCode:
        "TOKEN_EXPIRED"
    };

  }

  await db.execute(
    `
    UPDATE registration_requests
    SET
      email_verified = 1,
      status = 'PENDING_APPROVAL',
      validation_token = NULL,
      validation_expires = NULL
    WHERE id = ?
    `,
    [request.id]
  );

  return {
    success: true
  };

}

module.exports = {
  createRegistrationRequest,
  verifyEmailToken
};