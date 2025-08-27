"use client";
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface TestimonialPopupProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (testimonial: any) => void;
}

const TestimonialPopup: React.FC<TestimonialPopupProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    message: "",
    rating: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      onSubmit({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      setFormData({ name: "", position: "", message: "", rating: 5 });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div className="modal-content" style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        <div className="modal-header" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}>
          <h3>{t("testimonials.writeReview")}</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">{t("testimonials.yourName")}:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label htmlFor="position">{t("testimonials.yourPosition")}:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label htmlFor="rating">{t("testimonials.rating")}:</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label htmlFor="message">{t("testimonials.yourMessage")}:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "0.25rem",
                resize: "vertical",
              }}
            />
          </div>
          
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              {t("testimonials.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialPopup;