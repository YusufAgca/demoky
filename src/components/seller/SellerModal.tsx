"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Select, Steps, Button, message, Upload } from "antd";
import {
  ShopOutlined,
  UserOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  DollarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSellerModalOpen } from "@/store/slices/uiSlice";
import { MAIN_NAV_CATEGORIES } from "@/data/categories";

const { Option } = Select;
const { TextArea } = Input;

/**
 * Ant Design Satıcı Başvuru Modalı (Sell on Elonky Application Modal)
 * 
 * Mimari Açıklama:
 * İlan gereksiniminde yer alan 'Ant Design' tecrübesini e-ticaret pazar yeri
 * mimarisinde en doğru yerde sergilemek adına; kurumsal form validasyonları,
 * çok adımlı başvuru süreci (Steps) ve dosya yükleme operasyonları Ant Design
 * bileşenleriyle geliştirilmiştir.
 * 
 * Ant Design + Tailwind Birlikteliği:
 * - Vitrin arayüzü (Storefront): Tailwind CSS
 * - B2B / Satıcı & Yönetim Operasyonları: Ant Design
 */
export function SellerModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSellerModalOpen);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    dispatch(setSellerModalOpen(false));
    setCurrentStep(0);
    form.resetFields();
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep((prev) => prev + 1);
    } catch {
      // Form doğrulama hataları Ant Design tarafından otomatik gösterilir
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    try {
      setIsSubmitting(true);
      // Mock API gönderim gecikmesi
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Application submitted successfully! Our merchant team will contact you within 24 hours.");
      handleClose();
    } catch {
      message.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-elonky-dark-900 font-serif text-lg py-1 border-b border-gray-100">
          <ShopOutlined className="text-elonky-brand text-xl" />
          <span>Start Selling on Demoky — Global Artisan Marketplace</span>
        </div>
      }
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={680}
      destroyOnClose
      centered
      className="elonky-seller-modal"
    >
      <div className="py-4">
        {/* Ant Design Steps Çok Adımlı İlerleme Göstergesi */}
        <Steps
          current={currentStep}
          size="small"
          className="mb-6"
          items={[
            { title: "Store Info", icon: <ShopOutlined /> },
            { title: "Artisan Details", icon: <UserOutlined /> },
            { title: "Review & Submit", icon: <CheckCircleOutlined /> },
          ]}
        />

        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          initialValues={{
            country: "United States",
            currency: "USD",
          }}
        >
          {/* Adım 1: Mağaza Temel Bilgileri */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="p-3 bg-elonky-surface-muted rounded-lg border border-elonky-surface-border text-xs text-elonky-text-secondary">
                🌟 Join over 50+ independent artisan shops shipping to 50+ countries with <strong>0% listing fees</strong>!
              </div>

              <Form.Item
                name="storeName"
                label={<span className="text-xs font-semibold text-elonky-dark-900">Shop / Brand Name</span>}
                rules={[{ required: true, message: "Please enter your store or brand name" }]}
              >
                <Input placeholder="e.g. Anatolian Artisan Studio" className="rounded-lg h-10" />
              </Form.Item>

              <Form.Item
                name="category"
                label={<span className="text-xs font-semibold text-elonky-dark-900">Primary Product Category</span>}
                rules={[{ required: true, message: "Please select your primary craft category" }]}
              >
                <Select placeholder="Select primary category" className="h-10">
                  {MAIN_NAV_CATEGORIES.map((cat) => (
                    <Option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="country"
                  label={<span className="text-xs font-semibold text-elonky-dark-900">Country of Production</span>}
                  rules={[{ required: true }]}
                >
                  <Select className="h-10">
                    <Option value="United States">United States</Option>
                    <Option value="Turkey">Turkey (Türkiye)</Option>
                    <Option value="United Kingdom">United Kingdom</Option>
                    <Option value="Germany">Germany</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="currency"
                  label={<span className="text-xs font-semibold text-elonky-dark-900">Store Currency</span>}
                >
                  <Select className="h-10">
                    <Option value="USD">USD ($)</Option>
                    <Option value="EUR">EUR (€)</Option>
                    <Option value="GBP">GBP (£)</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
          )}

          {/* Adım 2: Sanatçı & Zanaat Detayları */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <Form.Item
                name="craftDescription"
                label={<span className="text-xs font-semibold text-elonky-dark-900">Tell us about your handmade creations</span>}
                rules={[{ required: true, message: "Please briefly describe how your products are handcrafted" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe your materials, crafting techniques, and whether you offer custom personalization..."
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="portfolio"
                label={<span className="text-xs font-semibold text-elonky-dark-900">Sample Craft Photos (Optional)</span>}
              >
                <Upload beforeUpload={() => false} maxCount={5} listType="picture">
                  <Button icon={<UploadOutlined />} className="rounded-lg">
                    Upload Sample Products
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          )}

          {/* Adım 3: İnceleme & Gönder */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in-50 duration-200 text-xs">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 space-y-2">
                <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                  <CheckCircleOutlined />
                  <span>Ready to join the Demoky Artisan Community!</span>
                </h4>
                <p className="text-emerald-800 leading-relaxed">
                  By submitting your application, you agree to Demoky&apos;s Seller Policy, handmade craftsmanship integrity standards, and customer fulfillment guidelines.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-elonky-text-secondary p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarOutlined className="text-elonky-brand" />
                  <span>Zero upfront listing fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobalOutlined className="text-elonky-brand" />
                  <span>Global marketplace reach</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigasyon Butonları */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
            {currentStep > 0 ? (
              <Button onClick={handlePrev} className="rounded-lg px-5">
                Back
              </Button>
            ) : <div />}

            <div className="flex gap-2">
              <Button onClick={handleClose} className="rounded-lg">
                Cancel
              </Button>
              {currentStep < 2 ? (
                <Button
                  type="primary"
                  onClick={handleNext}
                  className="bg-elonky-brand hover:bg-elonky-brand-hover rounded-lg px-6 font-semibold"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleFinish}
                  loading={isSubmitting}
                  className="bg-elonky-brand hover:bg-elonky-brand-hover rounded-lg px-6 font-semibold shadow-sm"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
