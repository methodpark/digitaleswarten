from twilio.rest import Client

from notifier import access


client = Client(access.account_sid, access.auth_token)

def notify_entry(entry_name, reciever_phone_number, place_name):
    """
    Notifies name that he has been called from the queue.
    The reciever_phone_number must satisfy +49[0-9]+
    """
    global client

    message = client.messages.create(
            body=f'{entry_name}, bitte begeben Sie sich zu(r) {place_name}. \nSie sind der Nächste!',
            from_=access.from_number,
            to=reciever_phone_number)
    print(message.sid)
