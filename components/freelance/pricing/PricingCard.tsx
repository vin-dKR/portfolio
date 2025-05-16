"use client"
import { designServices } from "@/constant/Pricing";
import { useState } from "react";


const PricingCard = () => {
    // Set the first core service as default
    const [selectedService, setSelectedService] = useState<Service>(
        designServices.coreServices.services[0]
    );

    const allServices = [
        ...designServices.coreServices.services,
        ...designServices.additionalServices.services
    ];

    const handleServiceClick = (serviceId: number) => {
        const service = allServices.find(s => s.id === serviceId);
        if (service) setSelectedService(service);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 mt-4">
            {/* Service Selection Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
                {designServices.coreServices.services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className={`relative group h-12 px-1 transition-all ${selectedService?.id === service.id
                            ? "text-white"
                            : "text-gray-200"
                            }`}
                    >
                        {/* Gradientbackground for selected state */}
                        {selectedService?.id === service.id && (
                            <>
                                <div className='absolute top-[2px] -left-0 bg-gradient-to-br from-white to-purple-500 filter blur-lg w-[80%] h-[70%] z-0' />
                                <div className="absolute inset-[1px] bg-gradient-to-br from-white to-purple-950 rounded-[20px] overflow-hidden z-0">
                                    <div className="absolute inset-[6px] bg-gradient-to-tr from-white to-purple-500 filter blur-xs rounded-[20px] z-0" />
                                </div>
                            </>
                        )}

                        {/* Button content */}
                        <div className={`relative z-20 w-full h-[90%] flex items-center justify-center rounded-[20px] px-3 transition-colors duration-200 ${selectedService?.id === service.id ? "bg-gradient-to-bl from-purple-500/40 to-white/30" : "bg-gradient-to-bl dark:from-black/10 dark:to-white/30 from-black/80 to-black/30 border border-2 border-white/30"
                            }`}>
                            {service.title}

                            {/* Optional star icon (you can remove if not needed) */}
                            {selectedService?.id === service.id && (
                                <div className='relative group-hover:animate-spin-star'>
                                    {/* Replace with your Star component */}
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Service Details Card - Now always visible with default selection */}
            <div className="w-full max-w-[90vw] backdrop-blur-md sm:max-w-[600px] bg-gradient-to-t from-white/5 to-transparent rounded-3xl shadow-md overflow-hidden p-2 mx-auto">
                <div className="dark:bg-gray-200/2 bg-black/5 w-full py-6 sm:py-8 md:py-10 rounded-3xl border border-black/10 dark:border-white/5 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {selectedService.title}
                            </h2>
                            <h3 className="text-lg text-purple-600">
                                {selectedService.serviceName}
                            </h3>
                        </div>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {selectedService.deliveryTime}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6">{selectedService.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">What we'll need:</h4>
                            <ul className="list-disc pl-5 text-gray-600">
                                {selectedService.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">What you get:</h4>
                            <ul className="list-disc pl-5 text-gray-600">
                                {selectedService.deliverables.map((del, i) => (
                                    <li key={i}>{del}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between items-center border-t pt-4">
                        <div>
                            <span className="text-gray-500">Urgent delivery:</span>{" "}
                            <span className="text-red-500 font-medium">
                                {selectedService.urgentDelivery}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-500">Price:</span>{" "}
                            <span className="text-2xl font-bold text-purple-600">
                                {selectedService.price === null
                                    ? "Contact us"
                                    : typeof selectedService.price === "number"
                                        ? `$${selectedService.price}`
                                        : selectedService.price}
                            </span>
                        </div>
                    </div>

                    <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Get This Service
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
