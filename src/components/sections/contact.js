import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .contact-description {
    margin-bottom: 40px;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.5;
  }
`;

const StyledContactForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  text-align: left;

  .form-group {
    margin-bottom: 25px;

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--lightest-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 400;
    }

    input,
    textarea {
      width: 100%;
      padding: 15px 20px;
      border: 1px solid var(--light-slate);
      border-radius: var(--border-radius);
      background-color: var(--light-navy);
      color: var(--lightest-slate);
      font-family: inherit;
      font-size: var(--fz-md);
      transition: var(--transition);

      &:focus {
        outline: none;
        border-color: var(--green);
        box-shadow: 0 0 0 3px rgba(204, 68, 68, 0.1);
      }

      &::placeholder {
        color: var(--slate);
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .submit-button {
    ${({ theme }) => theme.mixins.bigButton};
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    width: 100%;
    padding: 15px 30px;
    font-size: var(--fz-md);
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus {
      background-color: var(--green-tint);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const StyledSuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  border: 1px solid var(--green);

  h3 {
    color: var(--green);
    margin-bottom: 10px;
  }

  p {
    color: var(--light-slate);
    margin: 0;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Netlify Forms (since you're hosting on Netlify)
      const formData = new FormData();
      formData.append('form-name', 'contact');
      formData.append('name', e.target.name.value);
      formData.append('email', e.target.email.value);
      formData.append('message', e.target.message.value);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback: open email client
      const subject = encodeURIComponent('Contact from Portfolio Website');
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:parth.chandak02@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading">Contact</h2>

      <p className="contact-description">
        I'm always interested in hearing about new opportunities and exciting projects in 
        autonomous vehicles, creative technology, and innovative engineering. Whether you have 
        a question, want to collaborate, or just want to say hi, I'll try my best to get back to you!
      </p>

      {isSubmitted ? (
        <StyledSuccessMessage>
          <h3>Thank you for your message!</h3>
          <p>I'll get back to you as soon as possible.</p>
        </StyledSuccessMessage>
      ) : (
        <>
          {/* Hidden form for Netlify build detection */}
          <form name="contact" netlify hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <textarea name="message"></textarea>
          </form>
          
          <StyledContactForm 
            name="contact" 
            method="POST" 
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </StyledContactForm>
        </>
      )}
    </StyledContactSection>
  );
};

export default Contact;
