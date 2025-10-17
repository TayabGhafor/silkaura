// Mock Payment Gateway for Testing
// Simulates a real payment gateway with realistic delays and responses

export interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'paypal' | 'applepay';
  cardDetails?: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface PaymentResponse {
  status: 'success' | 'failed' | 'error';
  paymentId: string;
  transactionId?: string;
  message: string;
  timestamp: string;
  amount?: number;
  currency?: string;
}

export interface CaptureResponse {
  status: 'captured' | 'failed';
  paymentId: string;
  captureId: string;
  message: string;
}

class MockPaymentGateway {
  private processingDelay = 2000; // 2 seconds to simulate real processing
  
  /**
   * Simulates payment creation
   * Returns success for valid amounts, simulates failures for testing
   */
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate network delay
    await this.delay(this.processingDelay);
    
    // Validate amount
    if (request.amount <= 0) {
      return {
        status: 'error',
        paymentId: '',
        message: 'Invalid payment amount',
        timestamp: new Date().toISOString(),
      };
    }
    
    // Simulate card validation for card payments
    if (request.paymentMethod === 'card' && request.cardDetails) {
      const cardNumber = request.cardDetails.cardNumber.replace(/\s/g, '');
      
      // Test card number: 4111111111111111 = success
      // Test card number: 4000000000000002 = card declined
      // Other cards = random success/failure
      
      if (cardNumber === '4000000000000002') {
        return {
          status: 'failed',
          paymentId: this.generatePaymentId(),
          message: 'Card declined - insufficient funds',
          timestamp: new Date().toISOString(),
        };
      }
      
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        return {
          status: 'error',
          paymentId: '',
          message: 'Invalid card number',
          timestamp: new Date().toISOString(),
        };
      }
      
      // Validate CVV
      if (!request.cardDetails.cvv || request.cardDetails.cvv.length < 3) {
        return {
          status: 'error',
          paymentId: '',
          message: 'Invalid CVV',
          timestamp: new Date().toISOString(),
        };
      }
      
      // Validate expiry date
      if (!this.isValidExpiryDate(request.cardDetails.expiryDate)) {
        return {
          status: 'error',
          paymentId: '',
          message: 'Card expired or invalid expiry date',
          timestamp: new Date().toISOString(),
        };
      }
    }
    
    // Success response
    const paymentId = this.generatePaymentId();
    return {
      status: 'success',
      paymentId,
      transactionId: this.generateTransactionId(),
      message: 'Payment processed successfully',
      timestamp: new Date().toISOString(),
      amount: request.amount,
      currency: request.currency,
    };
  }
  
  /**
   * Simulates payment capture (used for two-step payment flows)
   */
  async capturePayment(paymentId: string): Promise<CaptureResponse> {
    await this.delay(1000);
    
    if (!paymentId) {
      return {
        status: 'failed',
        paymentId: '',
        captureId: '',
        message: 'Invalid payment ID',
      };
    }
    
    return {
      status: 'captured',
      paymentId,
      captureId: this.generateCaptureId(),
      message: 'Payment captured successfully',
    };
  }
  
  /**
   * Simulates payment refund
   */
  async refundPayment(paymentId: string, amount: number): Promise<PaymentResponse> {
    await this.delay(1500);
    
    if (!paymentId || amount <= 0) {
      return {
        status: 'error',
        paymentId: '',
        message: 'Invalid refund request',
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      status: 'success',
      paymentId,
      transactionId: this.generateTransactionId(),
      message: 'Refund processed successfully',
      timestamp: new Date().toISOString(),
      amount,
      currency: 'USD',
    };
  }
  
  /**
   * Simulates webhook status check
   */
  async checkPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    await this.delay(500);
    
    if (!paymentId) {
      return {
        status: 'error',
        paymentId: '',
        message: 'Payment ID not found',
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      status: 'success',
      paymentId,
      message: 'Payment completed',
      timestamp: new Date().toISOString(),
    };
  }
  
  // Helper methods
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  private generatePaymentId(): string {
    return `mock_pay_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
  
  private generateTransactionId(): string {
    return `mock_txn_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
  
  private generateCaptureId(): string {
    return `mock_cap_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
  
  private isValidExpiryDate(expiryDate: string): boolean {
    if (!expiryDate || !expiryDate.includes('/')) {
      return false;
    }
    
    const [month, year] = expiryDate.split('/').map(s => s.trim());
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    if (isNaN(monthNum) || isNaN(yearNum)) {
      return false;
    }
    
    if (monthNum < 1 || monthNum > 12) {
      return false;
    }
    
    // Convert 2-digit year to 4-digit
    const fullYear = yearNum < 100 ? 2000 + yearNum : yearNum;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (fullYear < currentYear || (fullYear === currentYear && monthNum < currentMonth)) {
      return false;
    }
    
    return true;
  }
}

// Export singleton instance
export const mockPaymentGateway = new MockPaymentGateway();

// Test card numbers for different scenarios
export const TEST_CARDS = {
  SUCCESS: '4111111111111111',
  DECLINED: '4000000000000002',
  EXPIRED: '4000000000000069',
  INSUFFICIENT_FUNDS: '4000000000009995',
};
