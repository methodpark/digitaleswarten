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


Wartelokalität anlegen
----------------------

> HTTP-POST: /places
> JSON-Payload: { placeName: string; }
> 
> Answer: 200/OK;\
> JSON-Payload: { id: string; placeName: string; }
>
> Answer: 4xx/Not ok
>
> Answer 401/Not authorized

 Warteschlangen anlegen
----------------------

> HTTP-POST: /places/\<place-id\>/queues\
> JSON-Payload:  { queueName: string; }
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
> ticketNumber: number; name: string; state: string }\[\] }\[\]
>
> Answer: 4xx/Not ok
>
> Answer: 401/Not authorized

Personen-IDs anlegen
--------------------

> HTTP-POST: /places/\<places-id\>/queues/\<queue-id\>/entries
>
> JSON-Payload: { name: string; }
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

Personen aus der Warteschlange aufrufen
---------------------------------------

> HTTP-PUT:
> /places/\<place-id\>/queues/\<queue-id\>/entries/\<entry-id\>
> JSON-Payload: { state: string; phone_number: string}
> `state` hat zwei mögliche Werte: "waiting" oder "called"
> `phone_number` must be of the form +49[0-9]\* if no number is given set it to '-1'
>
> Answer: 200/OK
> JSON-Payload: { ticketNumber: number; name: string; state: string}
> `state` hat zwei mögliche Werte: "waiting" oder "called"
>
> Answer: 4xx/Not ok
 
Status einer Person in der Warteschlange abfragen
-------------------------------------------------
> HTTP-GET:
> /places/\<place-id\>/queues/\<queue-id\>/entries/\<entry-id\>?state
>
> Answer: 200/OK
> JSON-Payload: { id: string; ticketNumber: number; name: string; state: string}
> `state` hat zwei mögliche Werte: "waiting" oder "called"
>
> Answer: 4xx/Not ok

APIS für Patientenansicht
=========================

Auth: Public

Zustand der Warteschlange abrufen
---------------------------------

> HTTP-GET: /places/**\<place-id\>**/queues?personDetails=short
>
> Answer: 200/OK;\
> JSON-Payload: { id: string; name: string; entries: {id: string;
> ticketNumber: number; state: string}\[\] }\[\]
>
> Answer: 4xx/Not ok

Zustand der Warteschlange über place-id und ticked-id abfragen
-----------------------------------------------------------------

Ticket ID und Place ID erhält der Patient von der Praxis.

> HTTP-GET: /places/**\<place-id\>**/**\<ticket-id\>**
>
> Answer: 200/OK;\
> JSON-Payload: { queueSize: number; hasBeenCalledToFrontdesk: boolean }
>
> Answer: 4xx/Not ok
