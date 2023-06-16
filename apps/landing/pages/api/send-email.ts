import type { NextApiRequest, NextApiResponse } from "next";
import formData from "form-data";
import Mailgun from "mailgun.js";

const validate = (data: string | undefined, value: String) => {
  if (data === undefined) {
    throw new Error(`Following required value is undefined: ${value}`);
  } else {
    return data;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { userEmail } = req.body;
    const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

    validate(userEmail, "USER EMAIL");
    validate(MAILGUN_DOMAIN, "MAILGUN_DOMAIN");
    validate(MAILGUN_API_KEY, "MAILGUN_API_KEY");

    const mailgun = new Mailgun(formData);

    const mg = mailgun.client({
      username: "api",
      key: MAILGUN_API_KEY!,
      url: "https://api.eu.mailgun.net",
    });

    const mail = {
      from: "AI Generated <admin@ai-generated.dev>",
      to: `${userEmail}`,
      subject: "Welcome to AI Generated mailing list",
      html: "<h1>Testing some Mailgun awesomness!</h1>",
    };

    const response = await mg.messages.create(MAILGUN_DOMAIN!, mail);

    return res.status(200).json({ success: response });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : "Unknown Error";
    res.status(500).json({ error: errorMessage });
  }
}
