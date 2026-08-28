"use client";

import Image from "next/image";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LogOut,
  UploadCloud,
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { auth } from "@/lib/firebase-client";
import { appCheckToken } from "@/lib/app-check";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  description?: string;
  material?: string;
  finish?: string;
  style?: string;
};

const CATEGORIES = [
  "Living Room & Sofas",
  "Beds & Wardrobes",
  "Dining Sets",
  "Devghar (Mandir)",
  "Office & Study",
  "TV Units & Storage",
  "Full House Interiors",
  "Other",
];

const BACKGROUNDS = [
  {
    id: "original",
    name: "Original",
    description: "Keep the uploaded photo as it is.",
  },
  {
    id: "white",
    name: "Clean White",
    description: "Simple white catalog background.",
  },
  {
    id: "warm",
    name: "Warm Interior",
    description: "Warm neutral furniture showroom style.",
  },
];

export function OwnerPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Upload
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Product form
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [finish, setFinish] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState("");
  const [background, setBackground] = useState("original");

  // Publishing
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Existing products
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      refreshProducts();
    }
  }, [user]);

  async function refreshProducts() {
    const response = await fetch("/api/products");

    if (response.ok) {
      setProducts(await response.json());
    }
  }

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
    } catch (error) {
      console.error(error);
      setLoginError(
        "Login failed. Check your email and password."
      );
    }
  }

  async function uploadImage() {
    if (!file || !user) return;

    setUploading(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      const appToken = await appCheckToken();

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(appToken
            ? { "X-Firebase-AppCheck": appToken }
            : {}),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Image upload failed."
        );
      }

      setUploadedImageUrl(data.imageUrl);

      setMessage(
        "Photo uploaded. Now enter the product details below."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function publishProduct() {
    if (!user || !uploadedImageUrl) {
      setMessage("Upload a product image first.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      const appToken = await appCheckToken();

      const product = {
        name: name.trim(),
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        category: category.trim(),
        material: material.trim(),
        finish: finish.trim(),
        style: style.trim(),
        price: Number(price),
        imageUrl: uploadedImageUrl,
        originalImageUrl: uploadedImageUrl,
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(appToken
            ? { "X-Firebase-AppCheck": appToken }
            : {}),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Could not publish product."
        );
      }

      setMessage(
        `Product published successfully. ID: ${data.id}`
      );

      resetForm();
      await refreshProducts();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not publish product."
      );
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setFile(null);
    setUploadedImageUrl("");
    setName("");
    setShortDescription("");
    setDescription("");
    setCategory("");
    setMaterial("");
    setFinish("");
    setStyle("");
    setPrice("");
    setBackground("original");
  }

  async function removeProduct(id: string) {
    if (
      !user ||
      !confirm(
        "Unpublish this product from the public website?"
      )
    ) {
      return;
    }

    try {
      const token = await user.getIdToken(true);
      const appToken = await appCheckToken();

      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            ...(appToken
              ? {
                  "X-Firebase-AppCheck": appToken,
                }
              : {}),
          },
        }
      );

      if (response.ok) {
        await refreshProducts();
      } else {
        setMessage("Could not unpublish product.");
      }
    } catch {
      setMessage("Could not unpublish product.");
    }
  }

  if (checking) {
    return (
      <div className="owner-page">
        <div className="owner-main">
          <p>Loading secure owner portal…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-page">
      <div className="owner-nav">
        <a href="/" className="brand">
          <Image
            src="/assets/logo.png"
            alt="Parihar"
            width={45}
            height={45}
          />

          <span>
            <strong>PARIHAR</strong>
            <small>AI OWNER STUDIO</small>
          </span>
        </a>

        {user ? (
          <button
            className="btn btn-outline"
            onClick={() => signOut(auth)}
          >
            <LogOut size={15} />
            Sign out
          </button>
        ) : (
          <a
            href="/"
            className="btn btn-outline"
          >
            <ArrowLeft size={15} />
            Public website
          </a>
        )}
      </div>

      <div className="owner-main">
        {!user ? (
          <>
            <span className="eyebrow">
              OWNER-ONLY · CATALOG STUDIO
            </span>

            <h1>
              Manage your furniture catalog.
            </h1>

            <p>
              Login as the owner to upload furniture
              and publish products to the website.
            </p>

            <form
              className="owner-login"
              onSubmit={login}
            >
              <h2>Owner login</h2>

              <label>Email</label>

              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

              <label>Password</label>

              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

              <button
                className="btn btn-gold btn-large"
                style={{
                  marginTop: 24,
                  width: "100%",
                }}
              >
                Login to Owner Studio
              </button>

              {loginError && (
                <p style={{ color: "#ff9d8d" }}>
                  {loginError}
                </p>
              )}

              <p
                style={{
                  fontSize: 12,
                  color: "#8f8980",
                }}
              >
                Firebase Authentication protects
                the owner area.
              </p>
            </form>
          </>
        ) : (
          <>
            <span className="eyebrow">
              OWNER-ONLY · CATALOG STUDIO
            </span>

            <h1>
              Add furniture manually.
            </h1>

            <p>
              Upload a product photo, enter the
              information yourself, choose a background
              option and publish it.
            </p>

            {/* PHOTO UPLOAD */}

            <div className="upload-card">
              <h2>
                <UploadCloud size={22} />
                1. Product photo
              </h2>

              <div className="upload-zone">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => {
                    const selected =
                      event.target.files?.[0] || null;

                    setFile(selected);
                    setUploadedImageUrl("");
                    setMessage("");
                  }}
                />

                <p>
                  {file
                    ? file.name
                    : "Choose JPG, PNG or WebP · max 8 MB"}
                </p>
              </div>

              <button
                className="btn btn-gold btn-large"
                onClick={uploadImage}
                disabled={!file || uploading}
              >
                {uploading
                  ? "Uploading…"
                  : "Upload Product Photo"}
              </button>

              {uploadedImageUrl && (
                <div style={{ marginTop: 20 }}>
                  <p
                    style={{
                      color: "#e4cf8a",
                    }}
                  >
                    ✓ Photo uploaded successfully
                  </p>

                  <div className="preview">
                    <Image
                      src={uploadedImageUrl}
                      alt="Uploaded furniture"
                      width={800}
                      height={800}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* PRODUCT DETAILS */}

            {uploadedImageUrl && (
              <div className="upload-card">
                <h2>
                  2. Product information
                </h2>

                <div
                  style={{
                    display: "grid",
                    gap: 18,
                  }}
                >
                  <div>
                    <label>Product name *</label>

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Example: Royal 3 Seater Sofa"
                    />
                  </div>

                  <div>
                    <label>
                      Short description *
                    </label>

                    <input
                      type="text"
                      value={shortDescription}
                      onChange={(event) =>
                        setShortDescription(
                          event.target.value
                        )
                      }
                      placeholder="Short description shown on product cards"
                    />
                  </div>

                  <div>
                    <label>
                      Full description *
                    </label>

                    <textarea
                      value={description}
                      onChange={(event) =>
                        setDescription(
                          event.target.value
                        )
                      }
                      rows={6}
                      placeholder="Write the complete product description..."
                    />
                  </div>

                  <div>
                    <label>Category *</label>

                    <select
                      value={category}
                      onChange={(event) =>
                        setCategory(
                          event.target.value
                        )
                      }
                    >
                      <option value="">
                        Select category
                      </option>

                      {CATEGORIES.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label>Material</label>

                    <input
                      type="text"
                      value={material}
                      onChange={(event) =>
                        setMaterial(
                          event.target.value
                        )
                      }
                      placeholder="Example: Solid wood"
                    />
                  </div>

                  <div>
                    <label>Finish</label>

                    <input
                      type="text"
                      value={finish}
                      onChange={(event) =>
                        setFinish(
                          event.target.value
                        )
                      }
                      placeholder="Example: Walnut finish"
                    />
                  </div>

                  <div>
                    <label>Style</label>

                    <input
                      type="text"
                      value={style}
                      onChange={(event) =>
                        setStyle(
                          event.target.value
                        )
                      }
                      placeholder="Example: Modern"
                    />
                  </div>

                  <div>
                    <label>
                      Price (₹) *
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={price}
                      onChange={(event) =>
                        setPrice(
                          event.target.value
                        )
                      }
                      placeholder="Example: 45000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BACKGROUND */}

            {uploadedImageUrl && (
              <div className="upload-card">
                <h2>
                  <ImageIcon size={22} />
                  3. Product photo background
                </h2>

                <p>
                  Choose how the product photo should
                  be used.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    marginTop: 18,
                  }}
                >
                  {BACKGROUNDS.map(
                    (item) => (
                      <label
                        key={item.id}
                        style={{
                          display: "block",
                          padding: 16,
                          border:
                            background ===
                            item.id
                              ? "2px solid #d9ad2b"
                              : "1px solid #514a3d",
                          borderRadius: 12,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="background"
                          value={item.id}
                          checked={
                            background ===
                            item.id
                          }
                          onChange={(event) =>
                            setBackground(
                              event.target.value
                            )
                          }
                          style={{
                            marginRight: 10,
                          }}
                        />

                        <strong>
                          {item.name}
                        </strong>

                        <div
                          style={{
                            marginTop: 5,
                            marginLeft: 25,
                            color: "#999",
                            fontSize: 14,
                          }}
                        >
                          {item.description}
                        </div>
                      </label>
                    )
                  )}
                </div>

                {background !== "original" && (
                  <p
                    style={{
                      color: "#e4cf8a",
                      fontSize: 13,
                      marginTop: 15,
                    }}
                  >
                    Note: background replacement is
                    not automatic yet. For now this
                    option records your preferred
                    display style.
                  </p>
                )}
              </div>
            )}

            {/* PUBLISH */}

            {uploadedImageUrl && (
              <div className="upload-card">
                <h2>
                  4. Review & publish
                </h2>

                <p>
                  Check all information carefully
                  before publishing.
                </p>

                <button
                  className="btn btn-green btn-large"
                  onClick={publishProduct}
                  disabled={
                    saving ||
                    !name.trim() ||
                    !shortDescription.trim() ||
                    !description.trim() ||
                    !category ||
                    !price
                  }
                  style={{
                    marginTop: 20,
                    width: "100%",
                  }}
                >
                  {saving ? (
                    "Publishing…"
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      Publish Product
                    </>
                  )}
                </button>

                <button
                  className="btn btn-outline"
                  onClick={resetForm}
                  disabled={saving}
                  style={{
                    marginTop: 10,
                    width: "100%",
                  }}
                >
                  Discard
                </button>
              </div>
            )}

            {message && (
              <p
                style={{
                  color: "#e4cf8a",
                  marginTop: 20,
                }}
              >
                {message}
              </p>
            )}

            {/* PUBLISHED PRODUCTS */}

            <div className="owner-products">
              <h2>Published catalog</h2>

              {products.map((product) => (
                <div
                  className="owner-product-row"
                  key={product.id}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={90}
                    height={90}
                  />

                  <div>
                    <b>{product.name}</b>

                    <div className="status">
                      ● Published ·{" "}
                      {product.category}
                    </div>

                    <small>
                      {product.shortDescription}
                    </small>
                  </div>

                  <button
                    className="btn danger"
                    onClick={() =>
                      removeProduct(
                        product.id
                      )
                    }
                  >
                    <Trash2 size={15} />
                    Unpublish
                  </button>
                </div>
              ))}

              {products.length === 0 && (
                <p>
                  No published products yet.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}