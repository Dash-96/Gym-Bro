const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const token = process.env.EXPO_PUBLIC_TOKEN;

//! Continue
export async function getFriendsList() {
  try {
    const response = await fetch(`${baseUrl}/user/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const friends = await response.json();
    console.log(friends);
    return friends;
  } catch (err) {
    console.log(err);
  }
}
