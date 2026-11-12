import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, User, Truck, MessageCircle } from 'lucide-react';
import { CartItem, CheckoutDetails, PlacedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    postalCode: '54000',
    notes: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 15000;
  const shipping = isFreeShipping ? 0 : 350;
  const total = subtotal + shipping;

  const majorCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Sialkot',
    'Gujranwala',
    'Quetta',
    'Other City',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order: PlacedOrder = {
        orderId: `IK-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...items],
        subtotal,
        shipping,
        total,
        customer: formData,
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 800);
  };

  const handleWhatsAppOrderShare = () => {
    if (!completedOrder) return;
    const text = `*New Order Placed at Intakhab* 🛍️\nOrder ID: ${completedOrder.orderId}\nCustomer: ${completedOrder.customer.fullName} (${completedOrder.customer.phone})\nCity: ${completedOrder.customer.city}\nAddress: ${completedOrder.customer.address}\n\n*Items:*\n${completedOrder.items.map((i) => `• ${i.name} (${i.quantity}x) - Shirt: ${i.shirtSize}, Pant: ${i.pantSize}, Shirt Len: ${i.shirtLength}, Pant Len: ${i.pantLength} - Rs. ${i.price * i.quantity}`).join('\n')}\n\n*Total: Rs. ${completedOrder.total.toLocaleString('en-PK')}*\nPayment: ${completedOrder.customer.paymentMethod.toUpperCase()}`;
    window.open(`https://wa.me/923167779661?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      <div className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-[#FAF6F2] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/file_000000002824821181cc689ddface7a4_f24c2d22.png"
              alt="Intakhab"
              className="h-9 w-auto object-contain"
            />
            <div className="border-l border-stone-300 pl-3">
              <h3 className="font-serif text-base font-medium text-[#7A0B2E]">
                {completedOrder ? 'Order Confirmed' : 'Checkout & Dispatch'}
              </h3>
              <p className="text-[11px] text-stone-500">Secure Direct Order</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {completedOrder ? (
            /* Order Success Receipt */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-semibold text-stone-900">
                  Shukriya! Your Order is Confirmed
                </h4>
                <p className="text-xs text-stone-500">
                  Order reference: <strong className="text-[#7A0B2E] font-mono">{completedOrder.orderId}</strong>
                </p>
              </div>

              <div className="bg-[#FAF6F2] p-4 rounded-lg text-left text-xs space-y-3 border border-stone-200">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Recipient:</span>
                  <span className="font-semibold text-stone-900">{completedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-semibold text-stone-900 text-right">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-semibold text-[#7A0B2E] uppercase">
                    {completedOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-stone-950">
                  <span>Total Amount:</span>
                  <span className="text-[#7A0B2E]">Rs.{completedOrder.total.toLocaleString('en-PK')}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                Our tailoring team in Lahore will inspect your order and begin preparing your suit lengths. Our courier representative will contact you at <strong>{completedOrder.customer.phone}</strong> prior to delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppOrderShare}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-none flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Receive Updates on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-[#7A0B2E] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Back to Store
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Summary Strip */}
              <div className="bg-[#FAF6F2] p-4 rounded-lg border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900 block">
                    {items.length} {items.length === 1 ? 'Ensemble' : 'Ensembles'} in Order
                  </span>
                  <span className="text-stone-500">
                    {isFreeShipping ? 'Free Nationwide Delivery' : 'Standard Delivery Rs. 350'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 text-[10px] uppercase block">Total</span>
                  <span className="text-base font-bold text-[#7A0B2E] tabular-nums">
                    Rs.{total.toLocaleString('en-PK')}
                  </span>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#7A0B2E]">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ayesha Malik"
                        className="w-full text-xs py-2 px-3 pl-8 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E]"
                      />
                      <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Phone Number (for Courier SMS & WhatsApp) *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full text-xs py-2 px-3 pl-8 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E]"
                      />
                      <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ayesha@example.com"
                        className="w-full text-xs py-2 px-3 pl-8 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E]"
                      />
                      <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#7A0B2E]">
                  2. Shipping Address
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      House / Apartment / Street Address *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. House 42, Sector Y, Phase 3, D.H.A"
                        className="w-full text-xs py-2 px-3 pl-8 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E]"
                      />
                      <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs py-2 px-3 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E] bg-white cursor-pointer"
                      >
                        {majorCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="54000"
                        className="w-full text-xs py-2 px-3 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Tailoring / Delivery Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Special instructions regarding pant waist, door bell, or preferred delivery timing..."
                      rows={2}
                      className="w-full text-xs py-2 px-3 border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#7A0B2E]">
                  3. Payment Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#7A0B2E] bg-[#FAF6F2]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="mt-0.5 accent-[#7A0B2E]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-stone-900 block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Pay cash to courier upon inspecting package at your doorstep.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                      formData.paymentMethod === 'bank_transfer'
                        ? 'border-[#7A0B2E] bg-[#FAF6F2]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                      className="mt-0.5 accent-[#7A0B2E]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-stone-900 block">
                        Online Bank Transfer
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Meezan / HBL / Alfalah direct IBFT with receipt confirmation.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#7A0B2E] hover:bg-[#580620] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>CONFIRMING ORDER...</span>
                  ) : (
                    <span>CONFIRM & PLACE ORDER (Rs.{total.toLocaleString('en-PK')})</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
