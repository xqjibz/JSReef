### Mongo Layout for multiple tanks, controllers, etc.,...

```json

{
    _id : "tank name",
    controller : "type of arduino",
    serial_port : "/dev/acm0",
    outlets : [
        { id : 1, pin : 4, description: "heater", }
    ],
    lights : [
        { id: 1, pin : 5, description : "RB LDD 1000H"}
    ],
    schedules : [
        { id: 1, pattern : "every monday at 06:00 PM", action : "on", device : "outlet", device_id : 1}
    ],
    temp : [
        { id : 1, description : "in sump", voltage_range : "15 * V" }
    ]


}

```