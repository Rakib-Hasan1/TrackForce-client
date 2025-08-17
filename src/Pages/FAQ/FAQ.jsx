import React from 'react';

const FAQ = () => {
    return (
        <div className='w-11/12 mx-auto pt-16'>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title font-semibold">How do I create an account on TrackForce?</div>
                <div className="collapse-content text-sm">
                    New employees can register through the "Sign Up" page. Once registered, the Admin must verify and approve your account before you can access all features.
                </div>
            </div>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                <div className="collapse-content text-sm">
                    Click on the "Forgot Password" link on the login page and follow the instructions sent to your registered email address.
                </div>
            </div>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">How do I update my employee profile?</div>
                <div className="collapse-content text-sm">
                    Go to your dashboard, open "Profile Settings", and update your personal details such as bank account, contact information, or address.
                </div>
            </div>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">How does salary management work?</div>
                <div className="collapse-content text-sm">
                    HR submits payroll requests to Admin. Once approved, the salary status will be updated in your profile and marked as paid.
                </div>
            </div>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">Can an employee become an HR?</div>
                <div className="collapse-content text-sm">
                    Yes, Admin can promote verified employees to HR. HRs get additional permissions such as verifying employees and managing payroll.
                </div>
            </div>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">What happens if an employee is removed?</div>
                <div className="collapse-content text-sm">
                    When Admin fires an employee or HR, their account will be disabled and they can no longer log in to TrackForce.
                </div>
            </div>
            <div className="collapse bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">How secure is my data in TrackForce?</div>
                <div className="collapse-content text-sm">
                    All data is stored securely in MongoDB and access is restricted by role-based authentication. Sensitive information like salary and bank details is only visible to authorized users.
                </div>
            </div>
        </div>

    );
};

export default FAQ;