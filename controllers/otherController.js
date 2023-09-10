import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendContactEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { email, subject, description } = req.body;

  if (!email || !subject || !description)
    return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.MY_MAIL;

  const text = `Email is ${email}. \n${description}`;

  await sendContactEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message Has Been Sent.",
  });
});

export const feedback = catchAsyncError(async (req, res, next) => {
  const { email, subject, description } = req.body;

  if (!subject || !email || !description)
    return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.MY_MAIL;

  const text = `Email is ${email}. \n${description}`;

  await sendContactEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your feedback Has Been Sent.",
  });
});
