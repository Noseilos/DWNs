import nodemailer from "nodemailer";

// new Email(user, url).sendWelcome();

export default class Email {
  constructor(user, url, userId) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.userId = userId; // Assign userId to class property
    this.from = `DWN <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "PRODUCTION") {
      console.log("Using SendGrid transport");
      console.log(
        "SendGrid credentials:",
        process.env.SENDGRID_USERNAME,
        process.env.SENDGRID_PASSWORD
      );

      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = `
      <h1>Hello ${this.firstName}</h1>
      <p>${this.url}</p>
      <p>${subject}</p>
    `;

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Family!");
  }

  async sendPasswordReset() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Password Reset", // Hardcoded subject
      html: `<body style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f5f5f5; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"><h1>Change password request!</h1>
      <p>Your request on changing the password has been delivered. You can change the password of your account by clicking on the link below:</p>
     <br/>
     <a href=${this.url} target="_blank">Change password request.</a>
     <br/>
     <p>We appreciate your trust in us and look forward to providing you with a seamless experience.</p>
     <br/>
     <p>Best Regards,</p>
     <p>DWN Team</p></div></body>`,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
}
