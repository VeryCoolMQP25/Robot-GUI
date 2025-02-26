# import asyncio
# import websockets

# # Define the WebSocket server without using `path`
# async def websocket_server(websocket):
#     print("New connection established")
#     try:
#         while True:
#             room_number = await websocket.recv()  # Receive the room number from Python file
#             print(f"Received room number: {room_number}")

#             # Send the room number back to the browser
#             await websocket.send(room_number)
#     except Exception as e:
#         print(f"Error: {e}")
#     finally:
#         print("Connection closed")

# # Start the WebSocket server
# async def main():
#     # WebSocket server listening on localhost:8765
#     async with websockets.serve(websocket_server, "localhost", 8765):
#         print("Server started on ws://localhost:8765")
#         await asyncio.Future()  # Run the server forever

# if __name__ == "__main__":
#     asyncio.run(main())



import asyncio
import websockets
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator

# ROS 2 Node to perform navigation
class NavigationNode(Node):
    def __init__(self):
        super().__init__('room_navigation_node')
        self.navigator = BasicNavigator()

    def navigate_to_room(self, room_number):
        # Assuming each room has a specific coordinate (you can expand this logic to match your room numbers)
        room_coordinates = {
            "UH400": { "x": 36.8, "y": 2.27, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
            # Add other rooms here with their coordinates
        }

        if room_number in room_coordinates:
            # Unpack room coordinates dictionary
            room_data = room_coordinates[room_number]
            x = room_data["x"]
            y = room_data["y"]
            z = room_data["z"]
            orientationZ = room_data["orientationZ"]
            orientationW = room_data["orientationW"]

            # Create a goal Pose
            goal = PoseStamped()
            goal.header.frame_id = 'map'  # You might need to change this to your robot's map frame
            goal.pose.position.x = x
            goal.pose.position.y = y
            goal.pose.position.z = z
            goal.pose.orientation.z = orientationZ
            goal.pose.orientation.w = orientationW
            
            self.navigator.goToPose(goal)
            print("success")
            self.get_logger().info(f"Robot is navigating to room {room_number} at coordinates ({x}, {y}, {z}) with orientation ({orientationZ}, {orientationW})")
        else:
            print("didn't work")
            self.get_logger().warn(f"Room {room_number} not found in coordinates mapping!")

# WebSocket server to handle incoming messages
async def websocket_server(websocket):
    async for message in websocket:
        print(f"Received room number: {message}")
        # Initiate ROS navigation for received room number
        rclpy.init()
        navigation_node = NavigationNode()
        navigation_node.navigate_to_room(message)
        rclpy.spin(navigation_node)

# Start the WebSocket server
async def main():
    server = await websockets.serve(websocket_server, "localhost", 8765)
    print("WebSocket server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
