/* eslint spaced-comment: 0 */

const html = (argTitle, argMessage) => {
  const title = argTitle;
  const message = argMessage;
  const backgroundColor = '#495464';

  return /*html*/ `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title></title>
</head>

<body style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%; background-color: ${backgroundColor};">
  <table
    style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border: 0; border: 0;"
    width="100%" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td
          style="font-family: sans-serif; font-size: 16px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;"
          valign="top" width="580">
          <div style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
            <table
              style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #fff; border-radius: 3px; width: 100%;"
              width="100%">
              <tbody>
                <tr>
                  <td
                    style="font-family: sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 20px;"
                    valign="top">
                    <table
                      style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border: 0;"
                      width="100%" cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr>
                          <td style="font-family: sans-serif; font-size: 16px; vertical-align: top;" valign="top">
                            <h2 style="font-family: sans-serif; text-align: center;">
                              ${title}
                              </h1>
                              <p
                                style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">
                                ${message}
                              </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;
};

module.exports = html;
