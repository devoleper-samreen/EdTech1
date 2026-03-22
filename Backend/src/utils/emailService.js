import nodemailer from 'nodemailer';

const getTransporter = () => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const adminEmail = () => process.env.EMAIL_USER;

// Admin notification — new enrollment
export const sendEnrollmentEmail = async ({ name, email, phone, course, message }) => {
  console.log('[EMAIL] sendEnrollmentEmail called, EMAIL_USER:', process.env.EMAIL_USER);
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: adminEmail(),
    subject: `New Enrollment Request – ${course}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background: #FA8128; padding: 24px 32px;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">TechFox — New Enrollment</h1>
        </div>
        <div style="padding: 32px;">
          <p style="color: #6b7280; font-size: 15px; margin: 0 0 20px;">A new enrollment request has been submitted. Details below:</p>
          <div style="background: #fff7ed; border-left: 4px solid #FA8128; border-radius: 4px; padding: 16px 20px;">
            <table style="width: 100%; font-size: 14px; color: #374151; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #9ca3af; width: 130px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #9ca3af;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${phone}</td></tr>
              <tr><td style="padding: 6px 0; color: #9ca3af;">Email</td><td style="padding: 6px 0; font-weight: 600;">${email || '—'}</td></tr>
              <tr><td style="padding: 6px 0; color: #9ca3af;">Course</td><td style="padding: 6px 0; font-weight: 600;">${course}</td></tr>
              ${message ? `<tr><td style="padding: 6px 0; color: #9ca3af;">Message</td><td style="padding: 6px 0;">${message}</td></tr>` : ''}
            </table>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 14px 32px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 TechFox. All Rights Reserved.</p>
        </div>
      </div>
    `,
  };

  console.log('[EMAIL] Sending enrollment email to admin...');
  await getTransporter().sendMail(mailOptions);
  console.log('[EMAIL] Enrollment email sent!');
};

// Admin notification — new callback request
export const sendCallbackEmail = async ({ name, email, phone, type, company, requiredTraining, message }) => {
  console.log('[EMAIL] sendCallbackEmail called, EMAIL_USER:', process.env.EMAIL_USER);
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: adminEmail(),
    subject: `New Callback Request – ${type || 'General'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background: #FA8128; padding: 24px 32px;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">TechFox — New Callback Request</h1>
        </div>
        <div style="padding: 32px;">
          <p style="color: #6b7280; font-size: 15px; margin: 0 0 20px;">A new callback request has been submitted. Details below:</p>
          <div style="background: #fff7ed; border-left: 4px solid #FA8128; border-radius: 4px; padding: 16px 20px;">
            <table style="width: 100%; font-size: 14px; color: #374151; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #9ca3af; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #9ca3af;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${phone}</td></tr>
              <tr><td style="padding: 6px 0; color: #9ca3af;">Email</td><td style="padding: 6px 0; font-weight: 600;">${email || '—'}</td></tr>
              <tr><td style="padding: 6px 0; color: #9ca3af;">Type</td><td style="padding: 6px 0; font-weight: 600;">${type || 'General'}</td></tr>
              ${company ? `<tr><td style="padding: 6px 0; color: #9ca3af;">Company</td><td style="padding: 6px 0; font-weight: 600;">${company}</td></tr>` : ''}
              ${requiredTraining ? `<tr><td style="padding: 6px 0; color: #9ca3af;">Training Required</td><td style="padding: 6px 0; font-weight: 600;">${requiredTraining}</td></tr>` : ''}
              ${message ? `<tr><td style="padding: 6px 0; color: #9ca3af;">Message</td><td style="padding: 6px 0;">${message}</td></tr>` : ''}
            </table>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 14px 32px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 TechFox. All Rights Reserved.</p>
        </div>
      </div>
    `,
  };

  console.log('[EMAIL] Sending callback email to admin...');
  await getTransporter().sendMail(mailOptions);
  console.log('[EMAIL] Callback email sent!');
};
