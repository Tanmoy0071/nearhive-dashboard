import { FirestoreService } from "@/firebase/firestoreService";
import {  Order, User } from "@/types/backend/models";


export async function fetchCustomers() {
  // Fetch all users and orders
  const users = await FirestoreService.getAllDocs("Users") as User[];
  const orders = await FirestoreService.getAllDocs("Orders") as Order[];

  // Extract user IDs from orders
  const usersWithOrders = new Set(orders.map(order => order.userId));

  // Filter users who are in the orders list
  const customers = users.filter(user => usersWithOrders.has(user.userId));

  return customers;
}
