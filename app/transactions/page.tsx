import React from "react";

const page = () => {
  return (
    <div>
      <div className="border-b-1  relative p-5">
        <h5 className="text-lg font-medium text-center">Transactions</h5>
      </div>

      <div className="p-5">
        <p>filter:Active, Paid, Received, Overdue</p>
        {[0, 1, 2].map((item, index) => (
          <div key={index} className="rounded-lg p-5 w-full bg-gray-100 mb-3">
           
            <div className=" flex justify-between">
              <p>To receive</p>
              <p>Active</p>
            </div>

            <div className=" flex justify-between">
              <div>title</div>
              <div>4,000</div>
            </div>
            <div>
              <p>Due on 16 MAY 2025</p>
              <p>Completed on 16 MAY 2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
