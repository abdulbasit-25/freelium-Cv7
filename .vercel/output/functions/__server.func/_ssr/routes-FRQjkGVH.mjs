import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Plus, c as Download, i as Printer, l as ArrowUpRight, n as Upload, o as Info, r as Trash2, s as FileText, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-FRQjkGVH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
var emptyExperience = () => ({
	id: newId(),
	company: "",
	location: "",
	jobTitle: "",
	dates: "",
	achievements: ""
});
var emptyEducation = () => ({
	id: newId(),
	degree: "",
	years: "",
	institution: "",
	grade: "",
	subheading: "",
	details: ""
});
var emptyProject = () => ({
	id: newId(),
	name: "",
	dates: "",
	stack: "",
	description: ""
});
var emptySkill = () => ({
	id: newId(),
	category: "",
	items: ""
});
var emptyLanguage = () => ({
	id: newId(),
	language: "",
	proficiency: ""
});
var emptyCertification = () => ({
	id: newId(),
	name: "",
	issuer: ""
});
var emptyCustom = () => ({
	id: newId(),
	title: "",
	details: ""
});
var emptyCV = () => ({
	personal: {
		fullName: "",
		title: "",
		email: "",
		phone: "",
		location: "",
		linkedin: "",
		github: "",
		website: ""
	},
	summary: "",
	experience: [emptyExperience()],
	education: [emptyEducation()],
	projects: [],
	skills: [emptySkill()],
	languages: [],
	certifications: [],
	custom: [],
	template: "classic"
});
var STORAGE_KEY = "freelium-cv:v1";
/** Merge unknown parsed JSON into a valid CVData shape. */
function normalizeCV(input) {
	const base = emptyCV();
	if (!input || typeof input !== "object") return base;
	const raw = input;
	const withIds = (arr, fallback) => Array.isArray(arr) ? arr.map((item) => ({
		...fallback(),
		...item,
		id: item?.id ?? newId()
	})) : [];
	return {
		personal: {
			...base.personal,
			...raw.personal ?? {}
		},
		summary: typeof raw.summary === "string" ? raw.summary : "",
		experience: withIds(raw.experience, emptyExperience),
		education: withIds(raw.education, emptyEducation),
		projects: withIds(raw.projects, emptyProject),
		skills: withIds(raw.skills, emptySkill),
		languages: withIds(raw.languages, emptyLanguage),
		certifications: withIds(raw.certifications, emptyCertification),
		custom: withIds(raw.custom, emptyCustom),
		template: [
			"classic",
			"modern",
			"minimal",
			"executive"
		].includes(raw.template) ? raw.template : "classic"
	};
}
var inputBase = "w-full rounded-lg border border-white/10 panel-3 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 focus-gold";
function Field({ label, value, onChange, placeholder, type = "text" }) {
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "mb-1 block text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type,
			className: inputBase,
			value,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function TextArea({ label, value, onChange, placeholder, rows = 4, hint }) {
	const id = (0, import_react.useId)();
	const hintId = `${id}-hint`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "mb-1 block text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id,
				rows,
				"aria-describedby": hint ? hintId : void 0,
				className: `${inputBase} resize-y leading-relaxed`,
				value,
				placeholder,
				onChange: (e) => onChange(e.target.value)
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: hintId,
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
var BULLET_HINT = "Lines starting with • or - render as bullet points.";
function RepeatCard({ children, onRemove, removeLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative rounded-xl border border-white/10 panel-2 p-3 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onRemove,
			"aria-label": removeLabel,
			className: "absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[11px] text-muted-foreground transition-colors duration-150 hover:border-destructive/50 hover:text-destructive focus-gold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				className: "size-3",
				"aria-hidden": "true"
			}), "Remove"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children
		})]
	});
}
function AddButton({ label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-dashed border-gold/40 px-3 py-2 text-xs font-medium text-gold transition-colors duration-150 hover:border-gold hover:bg-gold/10 focus-gold",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), label]
	});
}
function SectionBlock({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 border-t border-white/5 px-4 py-5 first:border-t-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-foreground uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-block h-3 w-[3px] rounded-full bg-gold",
				"aria-hidden": "true"
			}), title]
		}), children]
	});
}
function CvForm({ data, setData }) {
	const setPersonal = (key) => (v) => setData((prev) => ({
		...prev,
		personal: {
			...prev.personal,
			[key]: v
		}
	}));
	function listOps(key, factory) {
		return {
			add: () => setData((prev) => ({
				...prev,
				[key]: [...prev[key], factory()]
			})),
			remove: (id) => setData((prev) => ({
				...prev,
				[key]: prev[key].filter((i) => i.id !== id)
			})),
			update: (id, field, value) => setData((prev) => ({
				...prev,
				[key]: prev[key].map((i) => i.id === id ? {
					...i,
					[field]: value
				} : i)
			}))
		};
	}
	const exp = listOps("experience", emptyExperience);
	const edu = listOps("education", emptyEducation);
	const proj = listOps("projects", emptyProject);
	const skill = listOps("skills", emptySkill);
	const lang = listOps("languages", emptyLanguage);
	const cert = listOps("certifications", emptyCertification);
	const custom = listOps("custom", emptyCustom);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
				title: "Personal information",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							value: data.personal.fullName,
							onChange: setPersonal("fullName"),
							placeholder: "Aisha Rahman"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Professional title",
							value: data.personal.title,
							onChange: setPersonal("title"),
							placeholder: "Product Designer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							type: "email",
							value: data.personal.email,
							onChange: setPersonal("email"),
							placeholder: "aisha@example.com"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							value: data.personal.phone,
							onChange: setPersonal("phone"),
							placeholder: "+92 300 1234567"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Location",
							value: data.personal.location,
							onChange: setPersonal("location"),
							placeholder: "Karachi, PK"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "LinkedIn",
							value: data.personal.linkedin,
							onChange: setPersonal("linkedin"),
							placeholder: "linkedin.com/in/aisha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GitHub / portfolio",
							value: data.personal.github,
							onChange: setPersonal("github"),
							placeholder: "github.com/aisha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Website",
							value: data.personal.website,
							onChange: setPersonal("website"),
							placeholder: "aisha.design"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
				title: "Professional summary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					label: "Summary",
					rows: 4,
					value: data.summary,
					onChange: (v) => setData((prev) => ({
						...prev,
						summary: v
					})),
					placeholder: "2–3 sentences about your focus and strengths.",
					hint: BULLET_HINT
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Work experience",
				children: [data.experience.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RepeatCard, {
					onRemove: () => exp.remove(item.id),
					removeLabel: "Remove this experience",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Company",
								value: item.company,
								onChange: (v) => exp.update(item.id, "company", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Location",
								value: item.location,
								onChange: (v) => exp.update(item.id, "location", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Job title",
								value: item.jobTitle,
								onChange: (v) => exp.update(item.id, "jobTitle", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Dates",
								value: item.dates,
								onChange: (v) => exp.update(item.id, "dates", v),
								placeholder: "2022 — Present"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						label: "Achievements",
						value: item.achievements,
						onChange: (v) => exp.update(item.id, "achievements", v),
						hint: BULLET_HINT
					})]
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add experience",
					onClick: exp.add
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Education",
				children: [data.education.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RepeatCard, {
					onRemove: () => edu.remove(item.id),
					removeLabel: "Remove this education entry",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Degree / qualification",
									value: item.degree,
									onChange: (v) => edu.update(item.id, "degree", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Years",
									value: item.years,
									onChange: (v) => edu.update(item.id, "years", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Institution",
									value: item.institution,
									onChange: (v) => edu.update(item.id, "institution", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "GPA / grade",
									value: item.grade,
									onChange: (v) => edu.update(item.id, "grade", v)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Sub-heading (optional)",
							value: item.subheading,
							onChange: (v) => edu.update(item.id, "subheading", v),
							placeholder: "Relevant Coursework"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							label: "Details",
							value: item.details,
							onChange: (v) => edu.update(item.id, "details", v),
							hint: BULLET_HINT
						})
					]
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add education",
					onClick: edu.add
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Projects",
				children: [data.projects.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RepeatCard, {
					onRemove: () => proj.remove(item.id),
					removeLabel: "Remove this project",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Project name",
								value: item.name,
								onChange: (v) => proj.update(item.id, "name", v)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Dates",
								value: item.dates,
								onChange: (v) => proj.update(item.id, "dates", v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tech stack / link",
							value: item.stack,
							onChange: (v) => proj.update(item.id, "stack", v),
							placeholder: "React, TypeScript — github.com/you/project"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							label: "Description",
							value: item.description,
							onChange: (v) => proj.update(item.id, "description", v),
							hint: BULLET_HINT
						})
					]
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add project",
					onClick: proj.add
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Skills",
				children: [data.skills.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RepeatCard, {
					onRemove: () => skill.remove(item.id),
					removeLabel: "Remove this skill group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Category",
						value: item.category,
						onChange: (v) => skill.update(item.id, "category", v),
						placeholder: "Design"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Skills (comma separated)",
						value: item.items,
						onChange: (v) => skill.update(item.id, "items", v),
						placeholder: "Figma, Prototyping, Design systems"
					})]
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add skill group",
					onClick: skill.add
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Languages",
				children: [data.languages.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepeatCard, {
					onRemove: () => lang.remove(item.id),
					removeLabel: "Remove this language",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Language",
							value: item.language,
							onChange: (v) => lang.update(item.id, "language", v)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Proficiency",
							value: item.proficiency,
							onChange: (v) => lang.update(item.id, "proficiency", v),
							placeholder: "Native"
						})]
					})
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add language",
					onClick: lang.add
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Certifications",
				children: [data.certifications.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepeatCard, {
					onRemove: () => cert.remove(item.id),
					removeLabel: "Remove this certification",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Certification",
							value: item.name,
							onChange: (v) => cert.update(item.id, "name", v)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Issuer / year",
							value: item.issuer,
							onChange: (v) => cert.update(item.id, "issuer", v)
						})]
					})
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add certification",
					onClick: cert.add
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
				title: "Custom sections",
				children: [data.custom.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RepeatCard, {
					onRemove: () => custom.remove(item.id),
					removeLabel: "Remove this custom section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Section title",
						value: item.title,
						onChange: (v) => custom.update(item.id, "title", v),
						placeholder: "Volunteering"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						label: "Details",
						value: item.details,
						onChange: (v) => custom.update(item.id, "details", v),
						hint: BULLET_HINT
					})]
				}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
					label: "Add custom section",
					onClick: custom.add
				})]
			})
		]
	});
}
var BULLET_RE = /^\s*(?:[•\-*\u2022]|\d+[.)])\s+/;
function hasBullets(text) {
	return text.split(/\r?\n/).some((line) => line.trim().length > 0 && BULLET_RE.test(line));
}
/** Renders a multiline block as a bulleted list or as paragraphs. */
function RichText({ text, className }) {
	const value = (text ?? "").trim();
	if (!value) return null;
	if (hasBullets(value)) {
		const items = value.split(/\r?\n/).map((line) => line.replace(BULLET_RE, "").trim()).filter(Boolean);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: `cv-list ${className ?? ""}`,
			children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: linkify(item) }, i))
		});
	}
	const paragraphs = value.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, " ").trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: paragraphs.filter(Boolean).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `cv-paragraph ${className ?? ""}`,
		children: linkify(p)
	}, i)) });
}
function ensureHttps(value) {
	const v = value.trim();
	if (!v) return "";
	if (/^https?:\/\//i.test(v)) return v;
	if (/^mailto:|^tel:/i.test(v)) return v;
	return `https://${v.replace(/^\/+/, "")}`;
}
function telHref(phone) {
	return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
function ExternalLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: "cv-link",
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		children
	});
}
var URL_TOKEN_RE = /((?:https?:\/\/|www\.)[^\s,;]+|[a-z0-9-]+(?:\.[a-z0-9-]+)+\/[^\s,;]*)/gi;
/** Turns URL-looking tokens inside free text into real anchors. */
function linkify(text) {
	const parts = text.split(URL_TOKEN_RE);
	if (parts.length === 1) return text;
	return parts.map((part, i) => {
		if (i % 2 === 1) {
			const clean = part.replace(/[.,;)]+$/, "");
			const trailing = part.slice(clean.length);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
				href: ensureHttps(clean),
				children: clean
			}), trailing] }, i);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "cv-section mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "cv-section-head",
			children: title
		}), children]
	});
}
function Row({ left, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0",
			children: left
		}), right ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "cv-meta shrink-0 text-right",
			children: right
		}) : null]
	});
}
function CvPreview({ data }) {
	const p = data.personal;
	if (!Boolean(p.fullName.trim() || p.title.trim() || p.email.trim())) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 px-8 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
			className: "size-10 text-ink-500",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink-600",
			children: "Fill in your details to preview your CV"
		})]
	});
	const contacts = [];
	if (p.email.trim()) contacts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
		href: `mailto:${p.email.trim()}`,
		children: p.email.trim()
	}));
	if (p.phone.trim()) contacts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
		href: telHref(p.phone),
		children: p.phone.trim()
	}));
	if (p.location.trim()) contacts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.location.trim() }));
	if (p.linkedin.trim()) contacts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
		href: ensureHttps(p.linkedin),
		children: p.linkedin.trim()
	}));
	if (p.github.trim()) contacts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
		href: ensureHttps(p.github),
		children: p.github.trim()
	}));
	if (p.website.trim()) contacts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
		href: ensureHttps(p.website),
		children: p.website.trim()
	}));
	const experience = data.experience.filter((e) => e.company || e.jobTitle || e.achievements);
	const education = data.education.filter((e) => e.degree || e.institution || e.details);
	const projects = data.projects.filter((e) => e.name || e.description);
	const skills = data.skills.filter((s) => s.category || s.items);
	const languages = data.languages.filter((l) => l.language);
	const certifications = data.certifications.filter((c) => c.name);
	const custom = data.custom.filter((c) => c.title || c.details);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			p.fullName.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "cv-name",
				children: p.fullName
			}) : null,
			p.title.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "cv-title",
				children: p.title
			}) : null,
			contacts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cv-contact",
				children: contacts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: " · "
				}) : null, c] }, i))
			}) : null
		] }),
		data.summary.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Professional Summary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: data.summary })
		}) : null,
		experience.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Work Experience",
			children: experience.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 first:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cv-item-title",
							children: e.jobTitle
						}),
						right: e.dates
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cv-meta italic",
						children: [e.company, e.location].filter(Boolean).join(" — ")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: e.achievements })
				]
			}, e.id))
		}) : null,
		education.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Education",
			children: education.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 first:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cv-item-title",
							children: e.degree
						}),
						right: e.years
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cv-meta italic",
							children: e.institution
						}),
						right: e.grade
					}),
					e.subheading.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "cv-meta mt-1 font-semibold",
						children: e.subheading
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: e.details })
				]
			}, e.id))
		}) : null,
		projects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Projects",
			children: projects.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 first:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cv-item-title",
							children: e.name
						}),
						right: e.dates
					}),
					e.stack.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "cv-meta italic",
						children: linkify(e.stack)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: e.description })
				]
			}, e.id))
		}) : null,
		skills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Skills",
			children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 first:mt-0",
				children: [s.category.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [s.category, ": "] }) : null, s.items]
			}, s.id))
		}) : null,
		languages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Languages",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: languages.map((l) => [l.language, l.proficiency].filter(Boolean).join(" — ")).join(" · ") })
		}) : null,
		certifications.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Certifications",
			children: certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "cv-item-title",
					children: c.name
				}),
				right: c.issuer
			}, c.id))
		}) : null,
		custom.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: c.title || "Additional",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: c.details })
		}, c.id))
	] });
}
function InfoModal({ open, onClose }) {
	const panelRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		closeRef.current?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
				return;
			}
			if (e.key !== "Tab" || !panelRef.current) return;
			const focusables = panelRef.current.querySelectorAll("a[href], button, [tabindex]:not([tabindex=\"-1\"])");
			if (focusables.length === 0) return;
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm motion-safe:animate-[fadeIn_150ms_ease-out]",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "info-modal-title",
			className: "w-full max-w-md rounded-2xl border border-white/10 panel-1 p-6 shadow-2xl motion-safe:animate-[modalIn_180ms_ease-out]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 w-1.5 rounded-full bg-gold",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "info-modal-title",
							className: "text-lg font-semibold tracking-tight text-foreground",
							children: "About Freelium CV"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: closeRef,
						type: "button",
						onClick: onClose,
						"aria-label": "Close about dialog",
						className: "shrink-0 rounded-full border border-white/10 p-1.5 text-muted-foreground transition-colors duration-150 hover:border-white/20 hover:text-foreground focus-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-4",
							"aria-hidden": "true"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted-foreground",
					children: "A private, browser-only resume builder. Everything you type stays on this device — autosaved locally, exportable as JSON, and printable to a real, text-selectable PDF with working links."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "mt-5 border-l-2 border-gold pl-3.5 text-sm italic leading-relaxed text-gold-bright",
					children: "\"A résumé is a document, not a screenshot.\""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "Built by Abdul Basit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://abdulbasit-archer.vercel.app/",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "group inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink-900 transition-opacity duration-150 hover:opacity-90 focus-gold",
						children: ["Meet the Creator", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
							"aria-hidden": "true"
						})]
					})]
				})
			]
		})
	});
}
var TEMPLATES = [
	{
		id: "classic",
		label: "Classic",
		blurb: "Times New Roman, understated"
	},
	{
		id: "modern",
		label: "Modern",
		blurb: "Sans-serif, navy accents"
	},
	{
		id: "minimal",
		label: "Minimal",
		blurb: "Georgia, airy and quiet"
	},
	{
		id: "executive",
		label: "Executive",
		blurb: "Palatino, maroon & gold"
	}
];
function Index() {
	const [data, setData] = (0, import_react.useState)(() => emptyCV());
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [infoOpen, setInfoOpen] = (0, import_react.useState)(false);
	const [mobileTab, setMobileTab] = (0, import_react.useState)("edit");
	const infoTriggerRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setData(normalizeCV(JSON.parse(raw)));
		} catch {}
		setLoaded(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!loaded) return;
		setSaving(true);
		const t = window.setTimeout(() => {
			try {
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			} catch {}
			setSaving(false);
		}, 800);
		return () => window.clearTimeout(t);
	}, [data, loaded]);
	const update = (0, import_react.useCallback)((updater) => setData(updater), []);
	const exportJson = () => {
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${(data.personal.fullName || "freelium-cv").replace(/\s+/g, "-").toLowerCase()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const importJson = async (file) => {
		try {
			setData(normalizeCV(JSON.parse(await file.text())));
			setMobileTab("edit");
		} catch {
			window.alert("That file could not be read as FREELIUM CV JSON.");
		}
	};
	const clearAll = () => {
		if (!window.confirm("Clear every field and delete the saved copy in this browser?")) return;
		window.localStorage.removeItem(STORAGE_KEY);
		setData(emptyCV());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dark app-shell min-h-screen lg:grid lg:h-screen lg:grid-cols-[390px_minmax(0,1fr)] lg:overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `no-print panel-1 flex min-h-0 flex-col border-r border-white/5 ${mobileTab === "preview" ? "hidden lg:flex" : "flex"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-white/5 px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "truncate text-sm font-semibold tracking-[0.22em] text-foreground uppercase",
									children: ["Freelium ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: "CV"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: "Local-first resume builder"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-block size-2 rounded-full bg-pulse shadow-[0_0_8px_var(--color-pulse)] ${saving ? "animate-pulse" : ""}`,
									"aria-hidden": "true"
								}), saving ? "Saving…" : "Saved"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: [
								[
									{
										label: "Export",
										icon: Download,
										onClick: exportJson
									},
									{
										label: "Import",
										icon: Upload,
										onClick: () => fileRef.current?.click()
									},
									{
										label: "Clear",
										icon: Trash2,
										onClick: clearAll
									},
									{
										label: "Print / PDF",
										icon: Printer,
										onClick: () => window.print()
									}
								].map(({ label, icon: Icon, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick,
									className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 panel-3 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors duration-150 hover:border-gold/50 hover:text-foreground focus-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-3.5",
										"aria-hidden": "true"
									}), label]
								}, label)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									ref: infoTriggerRef,
									type: "button",
									onClick: () => setInfoOpen(true),
									className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 panel-3 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors duration-150 hover:border-gold/50 hover:text-foreground focus-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										className: "size-3.5",
										"aria-hidden": "true"
									}), "Info"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "application/json",
									className: "sr-only",
									"aria-label": "Import CV JSON file",
									onChange: (e) => {
										const file = e.target.files?.[0];
										if (file) importJson(file);
										e.target.value = "";
									}
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-4 gap-1.5",
							children: TEMPLATES.map((t) => {
								const active = data.template === t.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": active,
									title: t.blurb,
									onClick: () => setData((prev) => ({
										...prev,
										template: t.id
									})),
									className: `rounded-lg border px-2 py-2 text-[11px] transition-colors duration-150 focus-gold ${active ? "border-gold bg-gold/15 text-gold-bright" : "border-white/10 panel-3 text-muted-foreground hover:text-foreground"}`,
									children: t.label
								}, t.id);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 lg:overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvForm, {
						data,
						setData: update
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `print-region print-surface min-h-screen bg-paper-bg px-4 pt-8 pb-24 lg:min-h-0 lg:py-8 lg:overflow-y-auto ${mobileTab === "preview" ? "block" : "hidden lg:block"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: `cv-paper tpl-${data.template} mx-auto w-full max-w-[680px] rounded-sm p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:p-10`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvPreview, { data })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 panel-1 p-2 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMobileTab("edit"),
					"aria-pressed": mobileTab === "edit",
					className: `flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-150 focus-gold ${mobileTab === "edit" ? "bg-gold text-ink-900" : "panel-3 text-muted-foreground"}`,
					children: "Edit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMobileTab("preview"),
					"aria-pressed": mobileTab === "preview",
					className: `flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-150 focus-gold ${mobileTab === "preview" ? "bg-gold text-ink-900" : "panel-3 text-muted-foreground"}`,
					children: "Preview"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoModal, {
				open: infoOpen,
				onClose: () => {
					setInfoOpen(false);
					infoTriggerRef.current?.focus();
				}
			})
		]
	});
}
//#endregion
export { Index as component };
