"use client"
import { designServices } from "@/constant/Pricing";
import { useState } from "react";
import ServiceButton from "./Button";
import Button from "../Button";
import CalPopup from "./CalEmbded";


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
        <div className="max-w-4xl mx-auto p-4 mt-4 font-lenia">
            {/* Service Selection Buttons */}
            <div className="flex flex-wrap w-full gap-2 mb-8 items-center justify-center">
                {designServices.coreServices.services.map((service) => (
                    <ServiceButton
                        key={service.id}
                        service={service}
                        onClick={() => handleServiceClick(service.id)}
                        isSelected={selectedService?.id === service.id}
                    />
                ))}
            </div>

            {/* Service Details Card - Now always visible with default selection */}
            <div className="w-full max-w-[90vw] backdrop-blur-md sm:max-w-[600px] bg-gradient-to-t from-white/5 to-transparent rounded-3xl shadow-md overflow-hidden p-2 mx-auto">
                <div className="dark:bg-gray-200/2 bg-black/5 w-full py-6 sm:py-8 md:py-10 rounded-3xl border border-black/10 dark:border-white/5 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                {selectedService.title}
                            </h2>
                            <h3 className="text-2xl font-instrui text-purple-600">
                                develop / design
                            </h3>
                        </div>
                        <span className="bg-purple-400 text-purple-900 text-xs font-medium px-2.5 py-0.5 rounded border border-purple-700/50">
                            {selectedService.deliveryTime}
                        </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedService.description}</p>

                    <div className="text-left mb-4">
                        <span className="text-3xl font-bold text-purple-600">
                            {selectedService.price === null
                                ? "Contact us"
                                : typeof selectedService.price === "number"
                                    ? `$${selectedService.price}`
                                    : selectedService.price}
                        </span>
                    </div>

                    <div className="mx-auto">
                        <CalPopup>
                            <Button
                                maxWidth="100%"
                                label="Get The Service"
                                onClick={() => { }}
                            />
                        </CalPopup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mx-auto mt-4">
                        <div>
                            <h4 className="font-semibold text-gray-800 text-lg dark:text-gray-200 mb-2">What we&apos;ll need:</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                                {selectedService.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-800 text-lg dark:text-gray-200 mb-2">What you get:</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                                {selectedService.deliverables.map((del, i) => (
                                    <li key={i}>{del}</li>
                                ))}
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default PricingCard;
