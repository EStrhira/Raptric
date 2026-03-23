interface OrderData {
  orderNumber: string;
  paymentId?: string;
  totalAmount: number;
  items: any[];
  billingAddress: any;
  shippingAddress: any;
  timestamp: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

class OrderService {
  private readonly STORAGE_KEY = 'esthira-orders';

  // Save order to localStorage
  saveOrder(orderData: OrderData): void {
    try {
      const existingOrders = this.getOrders();
      existingOrders.push(orderData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingOrders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  // Get all orders
  getOrders(): OrderData[] {
    try {
      const orders = localStorage.getItem(this.STORAGE_KEY);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  // Get order by order number
  getOrderByNumber(orderNumber: string): OrderData | null {
    try {
      const orders = this.getOrders();
      return orders.find(order => order.orderNumber === orderNumber) || null;
    } catch (error) {
      console.error('Error getting order by number:', error);
      return null;
    }
  }

  // Update order status
  updateOrderStatus(orderNumber: string, status: OrderData['status']): void {
    try {
      const orders = this.getOrders();
      const orderIndex = orders.findIndex(order => order.orderNumber === orderNumber);
      
      if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  // Generate order number
  generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `EST${timestamp}${random}`;
  }

  // Create order from payment success data
  createOrderFromPayment(paymentData: any): OrderData {
    return {
      orderNumber: this.generateOrderNumber(),
      paymentId: paymentData.id,
      totalAmount: paymentData.totalAmount || 0,
      items: paymentData.items || [],
      billingAddress: paymentData.billingAddress || {},
      shippingAddress: paymentData.shippingAddress || {},
      timestamp: paymentData.timestamp || new Date().toISOString(),
      status: 'pending'
    };
  }
}

export default new OrderService();
