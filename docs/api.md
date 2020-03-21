-   Grundsätzlich: REST-APIs!

-   ID == PrimaryKey oder UUID. Etwas das stabil bleibt

-   "ticketNumber" ist die Bon Nummer die man sonst ausgedruckt bekommen
    würde. Also etwas für den Menschen einfach Lesbares

APIs für Admin-Interface
========================

Auth:
-----

-   Bearer-Token als HTTP-Header?! =\> Erstmal ohne Authentifizierung
    bauen, aber im Hinterkopf behalten

Authentifizierung durchführen (kommt erst später)
-------------------------------------------------

HTTP-GET /places/\<place-id\>/bearerToken?password=\<pass\>

> Answer: 200/OK\
> JSON-Payload: { bearerToken: string; }

 Warteschlangen anlegen
----------------------

> HTTP-POST: /places/\<place-id\>/queues\
> Payload: JSON { queueName: string; }
>
> Answer: 200/OK;\
> JSON-Payload: { id: string; queueName: string; }
>
> Answer: 4xx/Not ok
>
> Answer: 401/Not authorized

Warteschlangen löschen
----------------------

> HTTP-DELETE: /places/\<place-id\>/queues/\<queue-id\>
>
> Answer: 200/OK
>
> Answer: 4xx/Not ok

Zustand der Warteschlange abrufen
---------------------------------

> HTTP-GET: /places/\<place-id\>/queues?personDetails=full
>
> Answer: 200/OK;\
> JSON-Payload: { id: string; name: string; entries: {id: string;
> ticketNumber: number; name: string}\[\] }\[\]
>
> Answer: 4xx/Not ok
>
> Answer: 401/Not authorized

Personen-IDs anlegen
--------------------

> HTTP-POST: /places/\<places-id\>/queues/\<queue-id\>/entries
>
> Payload: JSON { name: string; }
>
> Answer: 200/OK; JSON-Payload: { id: string; name: string;
> ticketNumber: number }
>
> Answer: ???/Not ok

Personen-IDs aus Queues entfernen
---------------------------------

> HTTP-DELETE:
> /places/\<place-id\>/queues/\<queue-id\>/entries/\<entry-id\>
>
> Answer: 200/OK
>
> Answer: 4xx/Not ok

APIS für Patientenansicht

Auth: Public

Zustand der Warteschlange abrufen
---------------------------------

> HTTP-GET: /places/**\<place-id\>**/queues?personDetails=short
>
> Answer: 200/OK;\
> JSON-Payload: { id: string; name: string; entries: {id: string;
> number: number}\[\] }\[\]
>
> Answer: 4xx/Not ok
