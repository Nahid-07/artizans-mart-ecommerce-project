import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
        
        {/* Header Section */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-2 inline-block">
            Our Return Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your satisfaction is our top priority. Please review our policy carefully.
          </p>
        </header>

        {/* Policy Sections */}
        <section className="space-y-8 text-gray-700">
          
          {/* Eligibility */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-blue-500 mr-2" />
              1. Eligibility Window
            </h2>
            <p className="leading-relaxed">
              Items are eligible for return or exchange within **30 days** of the date of purchase. To be eligible, your item must be **unused** and in the **same condition** that you received it, and must be in the original packaging.
            </p>
          </div>

          {/* Non-Returnable Items */}
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-red-500 mr-2" />
              2. Non-Returnable Items
            </h2>
            <p className="leading-relaxed">
              The following goods are exempt from being returned: **Digital products** (e.g., software, e-books), **gift cards**, **perishable goods** (e.g., food, flowers), and items marked as **Final Sale**.
            </p>
          </div>

          {/* Process */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-blue-500 mr-2" />
              3. Return Process
            </h2>
            <ol className="list-decimal list-inside space-y-2 leading-relaxed">
              <li>Contact our customer support team at <a href="mailto:support@artizansmart.com" className="text-blue-600 hover:underline">support@artizansmart.com</a> to initiate a return.</li>
              <li>Provide your order number and a clear reason for the return.</li>
              <li>Once approved, you will receive a Return Merchandise Authorization (RMA) number and shipping instructions.</li>
              <li>Ship the item back to us, ensuring the RMA number is clearly visible on the package.</li>
            </ol>
          </div>
          
          {/* Refunds */}
          <div className="border-l-4 border-green-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-green-500 mr-2" />
              4. Refunds
            </h2>
            <p className="leading-relaxed">
              Once your return is received and inspected, we will send you an email notification. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within **7-10 business days**. Shipping costs are non-refundable.
            </p>
          </div>

        </section>

        {/* Contact Info */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            If you have any questions regarding your return, please contact us.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ReturnPolicy;