import asyncio
import websockets


async def server(websocket,path):
    async for message in websocket:
        print(message)
        # await websocket.send(message)

start_server = websockets.serve(server, 'localhost', 8765)
loop = asyncio.get_event_loop()
loop.run_until_complete(start_server)
loop.run_forever()