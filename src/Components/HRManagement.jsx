import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import image1 from "../assets/section.webp";
import image2 from "../assets/section 2.png";

const HRManagement = () => {
    const features = [
        {
            title: "Centralizes Employee Data",
            description:
                "All your HR information organized in one secure, easy-to-access dashboard.",
        },
        {
            title: "Reduces Paperwork & Errors",
            description:
                "Minimize manual entry and eliminate repetitive HR admin work.",
        },
        {
            title: "Accelerates Payroll & Leave Approvals",
            description:
                "Automated workflows speed up approvals and ensure timely processing.",
        },
        {
            title: "Scales with Your Team",
            description:
                "Flexible and robust enough to support businesses of any size.",
        },
        {
            title: "Saves Time Through Automation",
            description:
                "Streamline routine HR tasks and focus on what really matters — your people.",
        },
    ];

    return (
        <div className="bg-base-200">
            <div className="w-11/12 mx-auto py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                {/* Left - Images */}
                <div className="flex flex-col items-center lg:items-end relative">
                    {/* Image 1 */}
                    <img
                        src={image1}
                        alt="HR Dashboard"
                        className="w-80 rounded-xl shadow-xl border-4 border-primary"
                    />

                    {/* Image 2 (normal on mobile, overlapped on lg) */}
                    <img
                        src={image2}
                        alt="HR Tools"
                        className="w-72 rounded-xl shadow-xl border-4 border-primary mt-8 lg:mt-0 lg:absolute lg:top-32 lg:left-12"
                    />
                </div>

                {/* Right - Features */}
                <div>
                    <h2 className="text-3xl font-extrabold mb-4 text-primary mozilla">
                        Unlock Smarter HR Management
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl">
                        Transform complex HR tasks into simple, automated workflows with a
                        template built for modern teams.
                    </p>

                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <FaCheckCircle className="text-primary text-2xl flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-lg">{feature.title}</p>
                                    <p className="font-semibold text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRManagement;
