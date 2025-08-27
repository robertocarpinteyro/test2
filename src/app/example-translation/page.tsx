"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { database } from "@/config/firebase";
import { ref, onValue, push } from "firebase/database";
import TestimonialPopup from "@/components/TestimonialPopup";
import ContactForm from "@/components/Contact";

export default function ExampleTranslationPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("");
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setFormStatus(t("form.errorMessage") || "Please fill in all fields.");
      return;
    }
    setFormStatus(t("form.successMessage") || "Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // Load testimonials from Firebase (if available)
  useEffect(() => {
    try {
      const testimonialsRef = ref(database, "testimonials");
      onValue(testimonialsRef, (snapshot) => {
        const data = snapshot.val();
        const loadedTestimonials = data ? Object.values(data) : [];
        setTestimonials(loadedTestimonials.reverse());
      });
    } catch (error) {
      console.log("Firebase not configured, using mock data");
      setTestimonials([
        {
          name: "John Doe",
          position: "Customer",
          message: "Great service!",
          rating: 5,
        }
      ]);
    }
  }, []);

  // Add testimonial to Firebase (if available)
  const addTestimonial = (testimonial: any) => {
    try {
      const testimonialsRef = ref(database, "testimonials");
      push(testimonialsRef, testimonial);
    } catch (error) {
      console.log("Firebase not configured, testimonial not saved");
      setTestimonials(prev => [testimonial, ...prev]);
    }
  };

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("pricing");

  // Get features from translation
  const features = t("services.buildInstallation.features", { returnObjects: true }) || [];
  const pricingCard = t("services.buildInstallation.tabs.pricingCard", { returnObjects: true }) || {};
  const currentServiceKey = "buildInstallation";

  // List of services and their keys
  const services = [
    { key: "landscapeDesign", path: "/services/landscapeDesign" },
    { key: "buildInstallation", path: "/services/buildInstallation" },
    { key: "lawnMaintenance", path: "/services/lawnMaintenance" },
    { key: "treeServices", path: "/services/treeServices" },
    { key: "propertyCleanups", path: "/services/propertyCleanups" },
    { key: "landscapeCare", path: "/services/landscapeCare" },
    { key: "xeriscaping", path: "/services/Xeriscaping" },
  ];

  return (
    <div className="single-servicePage">
      <section className="header-title section-padding">
        <div className="container">
          <h2 className="title">{t("services.buildInstallation.title")}</h2>
          <span className="sub-title">
            <Link href="/">{t("navigation.home")}</Link> /{" "}
            <span>{t("navigation.services")}</span> /{" "}
            <span>{t("services.buildInstallation.title")}</span>
          </span>
        </div>
      </section>
      <section className="single-service section-padding">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4 col-sm-5">
              <div className="left-bar">
                <div className="wrapper-menu">
                  <ul>
                    {services.map((service) => (
                      <li
                        key={service.key}
                        className={
                          service.key === currentServiceKey
                            ? "active-service"
                            : ""
                        }
                      >
                        <Link href={service.path}>
                          {t(`services.${service.key}.title`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="voucher">
                  <img src="/images/voucher-icon.png" alt="Voucher Icon" />
                  <h5>{t("services.buildInstallation.extra")}</h5>
                  <p>
                    <a href="#">{t("services.buildInstallation.link")}</a>
                  </p>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="col-md-8 col-sm-7">
              <div className="right-bar">
                <p>{t("services.buildInstallation.largedescription")}</p>
                {/* Features */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="caption">
                      <img
                        src="https://res.cloudinary.com/dxcr9utre/image/upload/v1747342534/Our_client_wanted_a_durable_and_stylish_raised_stone_vegetable_garden_bed_and_we_delivered_This_custom_bed_was_fpbv9s.jpg"
                        alt={t("services.buildInstallation.title")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="middle-content">
                      <p>
                        {t("services.buildInstallation.title")}{" "}
                        {t("navigation.services")}:
                      </p>
                      <ul>
                        {Array.isArray(features) && features.map((feature, idx) => (
                          <li key={idx}>
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />{" "}
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="priceing-section">
                  <div className="priceing-wrapper">
                    <ul className="nav nav-tabs" role="tablist">
                      <li
                        role="presentation"
                        className={activeTab === "pricing" ? "active" : ""}
                      >
                        <a
                          href="#tab-one"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => setActiveTab("pricing")}
                        >
                          {t("services.buildInstallation.tabs.pricing.title")}
                        </a>
                      </li>
                      <li
                        role="presentation"
                        className={activeTab === "reviews" ? "active" : ""}
                      >
                        <a
                          href="#tab-two"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => setActiveTab("reviews")}
                        >
                          {t("services.buildInstallation.tabs.reviews.title")}
                        </a>
                      </li>
                      <li
                        role="presentation"
                        className={activeTab === "contact" ? "active" : ""}
                      >
                        <a
                          href="#tab-three"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => setActiveTab("contact")}
                        >
                          {t("services.buildInstallation.tabs.contact.title")}
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content text-center">
                      {/* Pricing Tab */}
                      {activeTab === "pricing" && (
                        <div
                          role="tabpanel"
                          className="tab-pane fade in active"
                          id="tab-one"
                        >
                          <h3 style={{ marginBottom: 32 }}>
                            {t("services.buildInstallation.tabs.pricing.title")}
                          </h3>
                          <div className="row justify-content-center">
                            <div className="col-md-8">
                              <div className="priceing-table">
                                <h4>{pricingCard.title || "Starting at"}</h4>
                                <h5 className="amount">
                                  {pricingCard.price || "$XXX"}
                                </h5>
                                <p>{pricingCard.description}</p>
                                <ul className="option">
                                  {(pricingCard.features || []).map(
                                    (feature: string, i: number) => (
                                      <li key={i}>
                                        <i
                                          className="fa fa-check"
                                          aria-hidden="true"
                                        />{" "}
                                        {feature}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Reviews Tab */}
                      {activeTab === "reviews" && (
                        <div
                          role="tabpanel"
                          className="tab-pane fade in active"
                          id="tab-two"
                        >
                          <div
                            className="text-center"
                            style={{ marginBottom: 24 }}
                          >
                            <button
                              className="btn btn-primary"
                              onClick={() => setShowPopup(true)}
                            >
                              {t("testimonials.leaveButton") ||
                                "Leave a Testimonial"}
                            </button>
                          </div>
                          <div className="testimonial-list">
                            {testimonials.map((testimonial: any, index: number) => (
                              <div key={index} className="testimonial-item">
                                <div className="testimonial-wrapper">
                                  <p className="testimonial-message">
                                    &quot;{testimonial.message}&quot;
                                  </p>
                                  <div className="author">
                                    <img
                                      src="/images/testimonial-placeholder.png"
                                      alt="Author"
                                      className="author-image"
                                      style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginRight: 12,
                                      }}
                                    />
                                    <div className="author-details">
                                      <h5 className="author-name">
                                        {testimonial.name}
                                      </h5>
                                      <span className="author-position">
                                        {testimonial.position}
                                      </span>
                                    </div>
                                  </div>
                                  <ul
                                    className="rating"
                                    style={{
                                      padding: 0,
                                      margin: "8px 0",
                                      listStyle: "none",
                                    }}
                                  >
                                    {Array.from({
                                      length: testimonial.rating,
                                    }).map((_, i) => (
                                      <li
                                        key={i}
                                        style={{
                                          display: "inline",
                                          color: "#FFD700",
                                        }}
                                      >
                                        <i className="fa fa-star" />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                          <TestimonialPopup
                            show={showPopup}
                            onClose={() => setShowPopup(false)}
                            onSubmit={addTestimonial}
                          />
                        </div>
                      )}
                      {/* Contact Tab */}
                      {activeTab === "contact" && (
                        <ContactForm
                          formData={formData}
                          formStatus={formStatus}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          t={t}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* End Tabs */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}