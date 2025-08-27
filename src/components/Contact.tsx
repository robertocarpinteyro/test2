"use client";
import React from "react";

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  formStatus: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  t: (key: string) => string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  formStatus,
  handleChange,
  handleSubmit,
  t,
}) => {
  return (
    <div
      role="tabpanel"
      className="tab-pane fade in active"
      id="tab-three"
    >
      <h3 style={{ marginBottom: 32 }}>
        {t("form.getInTouch")}
      </h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">{t("form.name")}:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">{t("form.email")}:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">{t("form.phone")}:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">{t("form.message")}:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            rows={5}
            required
          />
        </div>
        {formStatus && (
          <div className={`alert ${formStatus.includes("success") ? "alert-success" : "alert-danger"}`}>
            {formStatus}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {t("form.submit")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;