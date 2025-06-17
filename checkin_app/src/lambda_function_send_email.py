import json
import boto3
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import base64

ses_client = boto3.client('ses', region_name='us-east-1')

def lambda_handler(event, context):

    if 'body' in event:
        body = event['body']
        print("Body: {}".format(body))
    else:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing body in event'})
        }

    if isinstance(body, str):
        try:
            body = json.loads(body)
        except json.JSONDecodeError as e:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid JSON'})
            }

    to = body.get('to')
    subject = body.get('subject')
    message = body.get('message')
    attachments = body.get('attachments', [])

    # Create the email
    email = MIMEMultipart()
    email['From'] = 'no-reply@majestic-resorts.com'  # correo verificado en SES
    email['To'] = to # 'jgonzalez@tychegroup.es'
    email['Subject'] = subject

    # Add the body of the email
    email.attach(MIMEText(message, 'html'))

    # Include attachments
    for attachment in attachments:
        attachment_base64 = attachment.get('base64')
        attachment_name = attachment.get('filename')

        if attachment_base64 and attachment_name:
            file_data = base64.b64decode(attachment_base64)
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(file_data)
            encoders.encode_base64(part)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename={attachment_name}'
            )
            email.attach(part)

    # Send the email
    try:
        response = ses_client.send_raw_email(
            Source=email['From'],
            Destinations=[email['To']],
            RawMessage={
                'Data': email.as_string()
            }
        )
        print("Correo enviado exitosamente")
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Correo enviado exitosamente con %d adjuntos' % len(attachments),
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'response': response
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error al enviar el correo',
                'error': str(e)
            })
        }