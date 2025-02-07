# Implementation Plan

Use a Map-Like Object (key-value storage) in Redux

Key: Image's original order (index)
Value: Image object or null when deleted
Delete an Image

Set the value to null, keeping the key intact.
Restore an Image

Replace null with the original image.

# How It Works

Initial Load: Images are stored in { key: imageItem } format.
Deleting an Image:
Value is replaced with null.
The original image is saved in deletedImages.
Restoring an Image:
Finds the earliest deleted image and restores it in order.
Pros of This Solution
✅ Order is preserved since the keys don’t change.
✅ Efficient restoration since we restore in order (from deletedImages).
✅ O(1) deletion & restoration because we avoid array splice.

Would you like batch restoration as well? 🚀

📌 TL;DR
🔹 If order is backend-dependent, ask the backend to return a key-value store.
🔹 If frontend should manage order, convert an array to a key-value store in Redux.
🔹 Best option: Let the backend store position, and the frontend converts it into a map for efficient state management.

Which approach works best for your case? 🚀
