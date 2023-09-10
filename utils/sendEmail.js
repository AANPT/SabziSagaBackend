import { createTransport } from "nodemailer";

export const sendResetEmail = async (name, email, token) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "For Reset Password",
    html:
      "<p> Hii " +
      name +
      ', Please copy the link and<a href="http://localhost:3000/resetpassword/' +
      token +
      '">  reset your password </a>',
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail has been sent", info.response);
    }
  });
};

export const sendContactEmail = async (to, subject, text) => {
  const tranporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await tranporter.sendMail({
    to,
    subject,
    text,
  });
};
