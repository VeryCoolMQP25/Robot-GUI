import asyncio
import websockets
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator
import json

class NavigationNode(Node):
    def __init__(self):
        super().__init__('room_navigation_node')
        self.navigator = BasicNavigator()

    def navigate_to_room_and_floor(self, room_number, floor_number):
        # Define coordinates for rooms considering floor information
        room_coordinates = {
            "floor_1": {
                "Restrooms": { "x": -4, "y": 0.125, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH100": { "x": 2, "y": 19.2, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH150": { "x": 5.3, "y": 28.3, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH151": { "x": 3.49, "y": 11.4, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "Elevators": { "x": 4.64, "y": 3.15, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "Stairs": { "x": 1.7, "y": 31.3, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 }
            },
            "floor_2": {
                "Study_Area": { "x": 1.78, "y": 0.0, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "Stairs": { "x": 7.8, "y": 0.63, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Elevator": { "x": 5.0, "y": 26.7, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Restrooms": { "x": 13.7, "y": 28.9, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH200": { "x": 5.0, "y": -2.6, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH241": { "x": 5.5, "y": 8.6, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "UH220": { "x": 4.9, "y": 39.7, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 },
                "UH243": { "x": -1.7, "y": 20.8, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 },
                "UH235": { "x": 1.45, "y": 36.3, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 }
            },
            "floor_3": {
                "Elevator": { "x": 19.3, "y": 10.5, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Stairs": { "x": 47.9, "y": 10.8, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Restrooms": { "x": 17.4, "y": 18.5, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH300": { "x": 48.3, "y": 10.8, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH341": { "x": 39.6, "y": 9.5, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "UH320": { "x": 8.28, "y": 10.4, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 },
                "Study_Booths": { "x": 25.9, "y": 6.97, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "Study_Lounge": { "x": 50.2, "y": 4.98, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 }
            },
            "floor_4": {
                "UH400": { "x": 36.8, "y": 2.27, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH405": { "x": 26.1, "y": 1.73, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "UH420": { "x": 11.8, "y": 1.49, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 },
                "Elevator": { "x": 18.9, "y": 0.243, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Restrooms": { "x": 17.1, "y": 9.18, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "Study_Area": { "x": 48.7, "y": -0.122, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "Tech_Suites": { "x": 26.9, "y": -2.47, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 },
                "Stairs": { "x": 49.7, "y": 3.58, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 }
            },
            "floor_5": {
                "Study_Area": { "x": 71.7, "y": -4.84, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "Stairs": { "x": 66.2, "y": 0.8, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Elevator": { "x": 37.8, "y": -0.5, "z": 0.0, "orientationZ": 0.2, "orientationW": 0.98 },
                "Restrooms": { "x": 36.3, "y": 8.37, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH500": { "x": 55.6, "y": 1.02, "z": 0.0, "orientationZ": 0.00487, "orientationW": 0.99999 },
                "UH505": { "x": 43.4, "y": 1.1, "z": 0.0, "orientationZ": 0.1, "orientationW": 0.99 },
                "UH520": { "x": 18.4, "y": 0.5, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 },
                "Career_Development_Center": { "x": 16.7, "y": -6.11, "z": 0.0, "orientationZ": -0.1, "orientationW": 0.99 }
            }
        }

        floor_key = f"floor_{floor_number}"
        print(floor_number)
        print(floor_key)

        # Check if the floor exists in room_coordinates
        if floor_key in room_coordinates:
            # Check if the room exists in the floor's coordinates
            if room_number in room_coordinates[floor_key]:
                # Unpack room coordinates
                room_data = room_coordinates[floor_key][room_number]
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
                self.get_logger().info(f"Robot is navigating to room {room_number}, floor {floor_number} at coordinates ({x}, {y}, {z}) with orientation ({orientationZ}, {orientationW})")
            else:
                # Room not found for this floor
                print(f"Room {room_number} not found on floor {floor_number}")
                self.get_logger().warn(f"Room {room_number} not found on floor {floor_number}!")
        else:
            # Floor not found in the room coordinates
            print(f"Floor {floor_number} not found in coordinates mapping!")
            self.get_logger().warn(f"Floor {floor_number} not found in coordinates mapping!")

# WebSocket server to handle incoming messages
async def websocket_server(websocket):
    async for message in websocket:
        print(f"Received message: {message}")
        
        # Assuming the message contains both room_number and floor_number as a JSON string
        try:
            data = json.loads(message)
            room_number = data["room_number"]
            floor_number = data["floor_number"]

            # Initiate ROS navigation for received room number and floor number
            rclpy.init()
            navigation_node = NavigationNode()
            navigation_node.navigate_to_room_and_floor(room_number, floor_number)
            rclpy.spin(navigation_node)

        except json.JSONDecodeError:
            print("Error parsing JSON message.")
            await websocket.send("Invalid JSON data received.")
        except KeyError:
            print("Missing room_number or floor_number in message.")
            await websocket.send("Missing room_number or floor_number in message.")


# Start the WebSocket server
async def main():
    server = await websockets.serve(websocket_server, "localhost", 8765)
    print("WebSocket server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
