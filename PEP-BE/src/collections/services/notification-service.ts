import * as nodemailer from 'nodemailer';
import * as schedule from 'node-schedule';
import DAL_ERROR from '../../commons/dal-error';
class Transporter {
  public static async getMail(list: any, message: any, subject: any) {
    try {
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'performanceevaluationportal@gmail.com',
          pass: 'nineleaps' //replace with your password
        }
      });

      const mailOptions = {
        from: 'performanceevaluationportal@gmail.com',
        to: list,
        subject: subject,
        text: message
      };
      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  public static async ScheduleMail(list: any, message: any, subject: any, date: any) {
    const job = schedule.scheduleJob(date, () => {
      Transporter.getMail(list, message, subject);
    });
  }
}
export default Transporter;
