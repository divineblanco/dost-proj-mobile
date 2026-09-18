// import * as FileSystem from "expo-file-system/legacy";
// import * as Print from "expo-print";
// import { Platform } from "react-native";
// import { saveDownloadedResource } from "./resource-downloaded";

// export type ResourceAttachment = {
//   education_attachment_id?: string;
//   type?: string;
//   file_name: string;
//   file_url: string;
//   mime_type?: string | null;
//   file_size?: number | null;
//   order_index?: number;
// };

// export type DownloadResource = {
//   id: string;
//   title: string;
//   label: string;
//   materialType: string;
//   description: string;
//   content: string;
//   externalLink?: string | null;
//   updatedAt?: string | null;
//   category?: "Reports" | "Educational Materials";
//   attachments?: ResourceAttachment[];
// };

// function escapeHtml(value = ""): string {
//   return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
// }

// function sanitizeContentHtml(value = ""): string {
//   if (!value.trim()) return "";

//   return value
//     .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
//     .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
//     .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
//     .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, "")
//     .replace(/<embed\b[^>]*>/gi, "")
//     .replace(/\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
//     .replace(/\s+(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, "")
//     .replace(/\s+(href|src)\s*=\s*javascript:[^\s>]+/gi, "");
// }

// function normalizeContentHtml(value = ""): string {
//   return sanitizeContentHtml(value).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
// }

// function formatUpdatedDate(value?: string | null): string {
//   if (!value) return "N/A";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "N/A";

//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function sanitizeFileName(value: string): string {
//   return value.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").slice(0, 100) || "resource";
// }

// function isCatalogue(resource: DownloadResource): boolean {
//   const type = String(resource.materialType || "").trim().toLowerCase();
//   return type === "catalogue" || type === "catalog";
// }

// function isExternalLink(resource: DownloadResource): boolean {
//   const type = String(resource.materialType || "").trim().toUpperCase();
//   return type === "EXTERNAL_LINK" || type === "EXTERNAL LINK" || type === "EXTERNAL-LINK";
// }

// async function downloadCatalogueImages(attachments: ResourceAttachment[], resourceTitle: string): Promise<string[]> {
//   const validAttachments = [...attachments]
//     .filter((attachment) => Boolean(attachment?.file_url))
//     .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

//   console.log("[CATALOGUE DOWNLOAD] Found attachments:", validAttachments.length);

//   if (!validAttachments.length) {
//     throw new Error("This catalogue has no downloadable attachments.");
//   }

//   const directory = `${FileSystem.documentDirectory}catalogues/`;
//   const directoryInfo = await FileSystem.getInfoAsync(directory);

//   if (!directoryInfo.exists) {
//     await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
//   }

//   const safeTitle = sanitizeFileName(resourceTitle);
//   const downloadedImages: string[] = [];

//   for (let index = 0; index < validAttachments.length; index++) {
//     const attachment = validAttachments[index];
//     const url = attachment.file_url;
//     const extension = attachment.file_name?.split(".").pop()?.toLowerCase() || "jpg";
//     const fileName = `${safeTitle}_${index + 1}.${extension}`;
//     const destination = `${directory}${fileName}`;

//     console.log(`[CATALOGUE DOWNLOAD] Page ${index + 1}:`, url);

//     try {
//       const result = await FileSystem.downloadAsync(url, destination);

//       if (!result.uri) {
//         throw new Error(`No file URI returned for page ${index + 1}.`);
//       }

//       downloadedImages.push(result.uri);
//       console.log(`[CATALOGUE DOWNLOAD] Page ${index + 1} downloaded:`, result.uri);
//     } catch (error) {
//       console.error(`[CATALOGUE DOWNLOAD] Failed page ${index + 1}:`, error);
//       throw new Error(`Unable to download catalogue page ${index + 1}.\n\nURL:\n${url}`);
//     }
//   }

//   console.log("[CATALOGUE DOWNLOAD] Successfully downloaded:", downloadedImages);
//   return downloadedImages;
// }

// function imageToHtml(imageUri: string, pageNumber: number): string {
//   return `<div class="catalogue-page"><img src="${imageUri}" class="catalogue-image" /><div class="page-number">Page ${pageNumber}</div></div>`;
// }

// async function savePdfToDownloads(pdfUri: string, fileName: string): Promise<string> {
//   if (Platform.OS !== "android") return pdfUri;

//   console.log("[DOWNLOADS] Saving PDF to Android Downloads...");

//   const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

//   if (!permissions.granted) {
//     throw new Error("Permission to save the PDF was not granted.");
//   }

//   const destinationUri = await FileSystem.StorageAccessFramework.createFileAsync(
//     permissions.directoryUri,
//     fileName,
//     "application/pdf"
//   );

//   console.log("[DOWNLOADS] Destination:", destinationUri);

//   const base64 = await FileSystem.readAsStringAsync(pdfUri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });

//   await FileSystem.StorageAccessFramework.writeAsStringAsync(destinationUri, base64, {
//     encoding: FileSystem.EncodingType.Base64,
//   });

//   console.log("[DOWNLOADS] PDF saved successfully:", destinationUri);
//   return destinationUri;
// }

// export async function downloadResourcePDF(resource: DownloadResource, userId: string): Promise<string | undefined> {
//   if (!userId) throw new Error("User is not authenticated.");

//   console.log("[RESOURCE DOWNLOAD] Starting:", resource.title);
//   console.log("[RESOURCE DOWNLOAD] Type:", resource.materialType);
//   console.log("[RESOURCE DOWNLOAD] Updated at:", resource.updatedAt);
//   console.log("[RESOURCE DOWNLOAD] External link:", resource.externalLink || "");
//   console.log("[RESOURCE DOWNLOAD] Attachments:", resource.attachments || []);

//   const catalogue = isCatalogue(resource);
//   const externalLinkResource = isExternalLink(resource);

//   console.log("[RESOURCE DOWNLOAD] Is catalogue:", catalogue);
//   console.log("[RESOURCE DOWNLOAD] Is external link:", externalLinkResource);

//   let catalogueImages: string[] = [];

//   if (catalogue) {
//     catalogueImages = await downloadCatalogueImages(resource.attachments || [], resource.title);
//   }

//   const title = escapeHtml(resource.title);
//   const label = escapeHtml(resource.label);
//   const materialType = escapeHtml(resource.materialType);
//   const description = escapeHtml(resource.description || "");
//   const updatedDate = escapeHtml(formatUpdatedDate(resource.updatedAt));
//   const externalLink = escapeHtml(resource.externalLink || "");
//   const content = catalogue || externalLinkResource ? "" : normalizeContentHtml(resource.content || "");

//   const cataloguePages = catalogueImages.map((uri, index) => imageToHtml(uri, index + 1)).join("");

//   const html = `
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="utf-8" />
// <style>
// @page { margin: 0; }
// * { box-sizing: border-box; }
// body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #333333; background: #ffffff; }

// .resource-info {
//   padding: 40px 36px;
//   ${catalogue ? "page-break-after: always;" : ""}
// }

// h1 {
//   margin: 0 0 20px;
//   color: #35408E;
//   font-size: 28px;
//   line-height: 1.3;
// }

// .badges { margin-bottom: 20px; }

// .badge {
//   display: inline-block;
//   background: #EEF3FF;
//   color: #35408E;
//   padding: 7px 12px;
//   border-radius: 8px;
//   margin-right: 8px;
//   margin-bottom: 8px;
//   font-size: 13px;
//   font-weight: bold;
// }

// .updated-row {
//   margin-bottom: 26px;
//   color: #777777;
//   font-size: 12px;
// }

// .updated-label { font-weight: bold; color: #555555; }

// .section-title {
//   color: #35408E;
//   font-size: 19px;
//   font-weight: bold;
//   margin-top: 26px;
//   margin-bottom: 10px;
// }

// .description {
//   font-size: 15px;
//   line-height: 1.7;
//   color: #444444;
// }

// .external-link-container {
//   margin-top: 8px;
//   padding: 16px;
//   background: #F7F8FC;
//   border: 1px solid #E4E7F0;
//   border-radius: 8px;
// }

// .external-link-label {
//   margin-bottom: 8px;
//   color: #555555;
//   font-size: 13px;
//   font-weight: bold;
// }

// .external-link {
//   color: #35408E;
//   font-size: 14px;
//   line-height: 1.6;
//   word-break: break-all;
// }

// .external-link a {
//   color: #35408E;
//   text-decoration: underline;
// }

// .content {
//   font-size: 15px;
//   line-height: 1.7;
//   color: #444444;
// }

// .content p { margin-top: 0; margin-bottom: 12px; }
// .content span { color: inherit; }
// .content strong, .content b { font-weight: 700; color: #222222; }
// .content em, .content i { font-style: italic; }

// .content h1 {
//   font-size: 24px;
//   line-height: 1.3;
//   margin-top: 20px;
//   margin-bottom: 12px;
// }

// .content h2 {
//   font-size: 21px;
//   line-height: 1.3;
//   margin-top: 18px;
//   margin-bottom: 10px;
// }

// .content h3 {
//   font-size: 18px;
//   line-height: 1.3;
//   margin-top: 16px;
//   margin-bottom: 8px;
// }

// .content h4 {
//   font-size: 17px;
//   line-height: 1.3;
//   margin-top: 14px;
//   margin-bottom: 8px;
// }

// .content ul, .content ol {
//   margin-top: 8px;
//   margin-bottom: 14px;
//   padding-left: 24px;
// }

// .content li { margin-bottom: 6px; }

// .content blockquote {
//   margin: 12px 0;
//   padding-left: 14px;
//   border-left: 4px solid #35408E;
//   color: #555555;
// }

// .content a { color: #35408E; text-decoration: underline; }
// .content img { max-width: 100%; height: auto; }

// .content table {
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 12px;
//   margin-bottom: 16px;
// }

// .content th, .content td {
//   border: 1px solid #dddddd;
//   padding: 6px 8px;
//   text-align: left;
// }

// .content th {
//   background: #f3f4f8;
//   font-weight: 700;
// }

// .catalogue-page {
//   width: 100%;
//   min-height: 100vh;
//   page-break-after: always;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
// }

// .catalogue-page:last-child { page-break-after: auto; }

// .catalogue-image {
//   width: 100%;
//   height: auto;
//   max-height: 92vh;
//   object-fit: contain;
// }

// .page-number {
//   margin-top: 8px;
//   color: #777777;
//   font-size: 11px;
// }
// </style>
// </head>
// <body>

// <div class="resource-info">
//   <h1>${title}</h1>

//   <div class="badges">
//     <span class="badge">${label}</span>
//     <span class="badge">${materialType}</span>
//   </div>

//   <div class="updated-row">
//     <span class="updated-label">Last updated:</span> ${updatedDate}
//   </div>

//   ${description ? `<div class="section-title">Description</div><div class="description">${description}</div>` : ""}

//   ${externalLinkResource && externalLink ? `
//     <div class="section-title">External Link</div>
//     <div class="external-link-container">
//       <div class="external-link-label">This resource is available online:</div>
//       <div class="external-link">
//         <a href="${externalLink}" target="_blank">${externalLink}</a>
//       </div>
//     </div>
//   ` : ""}

//   ${externalLinkResource && !externalLink ? `
//     <div class="section-title">External Link</div>
//     <div class="description">No external link is available for this resource.</div>
//   ` : ""}

//   ${!catalogue && !externalLinkResource && content ? `
//     <div class="section-title">Content</div>
//     <div class="content">${content}</div>
//   ` : ""}
// </div>

// ${catalogue ? cataloguePages : ""}

// </body>
// </html>
// `;

//   console.log("[RESOURCE DOWNLOAD] Creating PDF...");

//   const { uri: temporaryPdfUri } = await Print.printToFileAsync({ html });
//   console.log("[RESOURCE DOWNLOAD] Temporary PDF:", temporaryPdfUri);

//   const fileName = `${sanitizeFileName(resource.title)}.pdf`;
//   const finalUri = `${FileSystem.documentDirectory}${fileName}`;
//   const existingFile = await FileSystem.getInfoAsync(finalUri);

//   if (existingFile.exists) {
//     await FileSystem.deleteAsync(finalUri, { idempotent: true });
//   }

//   await FileSystem.copyAsync({ from: temporaryPdfUri, to: finalUri });
//   console.log("[RESOURCE DOWNLOAD] App PDF:", finalUri);

//   let downloadedFileUri = finalUri;

//   if (Platform.OS === "android") {
//     downloadedFileUri = await savePdfToDownloads(finalUri, fileName);
//   }

//   await saveDownloadedResource({
//     id: String(resource.id),
//     title: resource.title,
//     description: resource.description,
//     label: resource.label,
//     materialType: resource.materialType,
//     category: resource.category === "Reports" ? "Reports" : "Educational Materials",
//     content: catalogue || externalLinkResource ? "" : resource.content || "",
//     fileUri: downloadedFileUri,
//     downloadedAt: new Date().toISOString(),
//     userId,
//   });

//   console.log("[RESOURCE DOWNLOAD] Saved downloaded resource:", downloadedFileUri);
//   return downloadedFileUri;
// }


import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import { saveDownloadedResource } from "./resource-downloaded";

export type ResourceAttachment = {
  education_attachment_id?: string;
  type?: string;
  file_name: string;
  file_url: string;
  mime_type?: string | null;
  file_size?: number | null;
  order_index?: number;
};

export type DownloadResource = {
  id: string;
  title: string;
  label: string;
  materialType: string;
  description: string;
  content: string;
  externalLink?: string | null;
  updatedAt?: string | null;
  category?: "Reports" | "Educational Materials";
  attachments?: ResourceAttachment[];
};

function escapeHtml(value = ""): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeContentHtml(value = ""): string {
  if (!value.trim()) return "";

  return value
    .replace(
      /<script\b[^>]*>[\s\S]*?<\/script>/gi,
      ""
    )
    .replace(
      /<style\b[^>]*>[\s\S]*?<\/style>/gi,
      ""
    )
    .replace(
      /<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi,
      ""
    )
    .replace(
      /<object\b[^>]*>[\s\S]*?<\/object>/gi,
      ""
    )
    .replace(/<embed\b[^>]*>/gi, "")
    .replace(
      /\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi,
      ""
    )
    .replace(
      /\s+(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi,
      ""
    )
    .replace(
      /\s+(href|src)\s*=\s*javascript:[^\s>]+/gi,
      "");
}

function normalizeContentHtml(value = ""): string {
  return sanitizeContentHtml(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

function formatUpdatedDate(
  value?: string | null
): string {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function sanitizeFileName(value: string): string {
  return (
    value
      .replace(/[^a-z0-9]/gi, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 100) || "resource"
  );
}

function isCatalogue(
  resource: DownloadResource
): boolean {
  const type = String(
    resource.materialType || ""
  )
    .trim()
    .toLowerCase();

  return (
    type === "catalogue" ||
    type === "catalog"
  );
}

function isExternalLink(
  resource: DownloadResource
): boolean {
  const type = String(
    resource.materialType || ""
  )
    .trim()
    .toUpperCase();

  return (
    type === "EXTERNAL_LINK" ||
    type === "EXTERNAL LINK" ||
    type === "EXTERNAL-LINK"
  );
}

async function downloadCatalogueImages(
  attachments: ResourceAttachment[],
  resourceTitle: string
): Promise<string[]> {
  const validAttachments = [...attachments]
    .filter(
      (attachment) =>
        Boolean(attachment?.file_url)
    )
    .sort(
      (a, b) =>
        (a.order_index ?? 0) -
        (b.order_index ?? 0)
    );

  console.log(
    "[CATALOGUE PDF] Found attachments:",
    validAttachments.length
  );

  if (!validAttachments.length) {
    throw new Error(
      "This catalogue has no downloadable attachments."
    );
  }

  const directory =
    `${FileSystem.cacheDirectory}catalogues/`;

  const directoryInfo =
    await FileSystem.getInfoAsync(directory);

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      directory,
      { intermediates: true }
    );
  }

  const safeTitle =
    sanitizeFileName(resourceTitle);

  const downloadedImages: string[] = [];

  for (
    let index = 0;
    index < validAttachments.length;
    index++
  ) {
    const attachment =
      validAttachments[index];

    const url = attachment.file_url;

    const extension =
      attachment.file_name
        ?.split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const fileName =
      `${safeTitle}_${index + 1}.${extension}`;

    const destination =
      `${directory}${fileName}`;

    console.log(
      `[CATALOGUE PDF] Downloading page ${index + 1}:`,
      url
    );

    try {
      const result =
        await FileSystem.downloadAsync(
          url,
          destination
        );

      if (!result.uri) {
        throw new Error(
          `No file URI returned for page ${
            index + 1
          }.`
        );
      }

      downloadedImages.push(result.uri);

      console.log(
        `[CATALOGUE PDF] Page ${
          index + 1
        } downloaded:`,
        result.uri
      );
    } catch (error) {
      console.error(
        `[CATALOGUE PDF] Failed page ${
          index + 1
        }:`,
        error
      );

      throw new Error(
        `Unable to download catalogue page ${
          index + 1
        }.`
      );
    }
  }

  return downloadedImages;
}

function imageToHtml(
  imageUri: string,
  pageNumber: number
): string {
  return `
    <div class="catalogue-page">
      <img
        src="${imageUri}"
        class="catalogue-image"
      />

      <div class="page-number">
        Page ${pageNumber}
      </div>
    </div>
  `;
}

/**
 * Generates the PDF file but does NOT save it
 * to Android Downloads and does NOT save it
 * to the downloaded-resources list.
 *
 * This is used by both Download and Share.
 */
export async function createResourcePDF(
  resource: DownloadResource
): Promise<string> {
  console.log(
    "[RESOURCE PDF] Creating:",
    resource.title
  );

  const catalogue =
    isCatalogue(resource);

  const externalLinkResource =
    isExternalLink(resource);

  let catalogueImages: string[] = [];

  if (catalogue) {
    catalogueImages =
      await downloadCatalogueImages(
        resource.attachments || [],
        resource.title
      );
  }

  const title = escapeHtml(
    resource.title
  );

  const label = escapeHtml(
    resource.label
  );

  const materialType =
    escapeHtml(resource.materialType);

  const description =
    escapeHtml(
      resource.description || ""
    );

  const updatedDate =
    escapeHtml(
      formatUpdatedDate(
        resource.updatedAt
      )
    );

  const externalLink =
    escapeHtml(
      resource.externalLink || ""
    );

  const content =
    catalogue ||
    externalLinkResource
      ? ""
      : normalizeContentHtml(
          resource.content || ""
        );

  const cataloguePages =
    catalogueImages
      .map((uri, index) =>
        imageToHtml(
          uri,
          index + 1
        )
      )
      .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />

<style>
@page {
  margin: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
  color: #333333;
  background: #ffffff;
}

.resource-info {
  padding: 40px 36px;
  ${
    catalogue
      ? "page-break-after: always;"
      : ""
  }
}

h1 {
  margin: 0 0 20px;
  color: #35408E;
  font-size: 28px;
  line-height: 1.3;
}

.badges {
  margin-bottom: 20px;
}

.badge {
  display: inline-block;
  background: #EEF3FF;
  color: #35408E;
  padding: 7px 12px;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: bold;
}

.updated-row {
  margin-bottom: 26px;
  color: #777777;
  font-size: 12px;
}

.updated-label {
  font-weight: bold;
  color: #555555;
}

.section-title {
  color: #35408E;
  font-size: 19px;
  font-weight: bold;
  margin-top: 26px;
  margin-bottom: 10px;
}

.description {
  font-size: 15px;
  line-height: 1.7;
  color: #444444;
}

.external-link-container {
  margin-top: 8px;
  padding: 16px;
  background: #F7F8FC;
  border: 1px solid #E4E7F0;
  border-radius: 8px;
}

.external-link-label {
  margin-bottom: 8px;
  color: #555555;
  font-size: 13px;
  font-weight: bold;
}

.external-link {
  color: #35408E;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
}

.external-link a {
  color: #35408E;
  text-decoration: underline;
}

.content {
  font-size: 15px;
  line-height: 1.7;
  color: #444444;
}

.content p {
  margin-top: 0;
  margin-bottom: 12px;
}

.content strong,
.content b {
  font-weight: 700;
  color: #222222;
}

.content em,
.content i {
  font-style: italic;
}

.content h1 {
  font-size: 24px;
  line-height: 1.3;
  margin-top: 20px;
  margin-bottom: 12px;
}

.content h2 {
  font-size: 21px;
  line-height: 1.3;
  margin-top: 18px;
  margin-bottom: 10px;
}

.content h3 {
  font-size: 18px;
  line-height: 1.3;
  margin-top: 16px;
  margin-bottom: 8px;
}

.content h4 {
  font-size: 17px;
  line-height: 1.3;
  margin-top: 14px;
  margin-bottom: 8px;
}

.content ul,
.content ol {
  margin-top: 8px;
  margin-bottom: 14px;
  padding-left: 24px;
}

.content li {
  margin-bottom: 6px;
}

.content blockquote {
  margin: 12px 0;
  padding-left: 14px;
  border-left: 4px solid #35408E;
  color: #555555;
}

.content a {
  color: #35408E;
  text-decoration: underline;
}

.content img {
  max-width: 100%;
  height: auto;
}

.content table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  margin-bottom: 16px;
}

.content th,
.content td {
  border: 1px solid #dddddd;
  padding: 6px 8px;
  text-align: left;
}

.content th {
  background: #f3f4f8;
  font-weight: 700;
}

/*
 * Every catalogue attachment becomes
 * exactly one PDF page.
 */
.catalogue-page {
  width: 100%;
  height: 100vh;

  page-break-after: always;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  padding: 0;
}

.catalogue-page:last-child {
  page-break-after: auto;
}

.catalogue-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-number {
  position: absolute;
  bottom: 6px;
  color: #777777;
  font-size: 10px;
}
</style>
</head>

<body>

<div class="resource-info">

  <h1>${title}</h1>

  <div class="badges">
    <span class="badge">
      ${label}
    </span>

    <span class="badge">
      ${materialType}
    </span>
  </div>

  <div class="updated-row">
    <span class="updated-label">
      Last updated:
    </span>

    ${updatedDate}
  </div>

  ${
    description
      ? `
        <div class="section-title">
          Description
        </div>

        <div class="description">
          ${description}
        </div>
      `
      : ""
  }

  ${
    externalLinkResource &&
    externalLink
      ? `
        <div class="section-title">
          External Link
        </div>

        <div class="external-link-container">
          <div class="external-link-label">
            This resource is available online:
          </div>

          <div class="external-link">
            <a
              href="${externalLink}"
              target="_blank"
            >
              ${externalLink}
            </a>
          </div>
        </div>
      `
      : ""
  }

  ${
    externalLinkResource &&
    !externalLink
      ? `
        <div class="section-title">
          External Link
        </div>

        <div class="description">
          No external link is available
          for this resource.
        </div>
      `
      : ""
  }

  ${
    !catalogue &&
    !externalLinkResource &&
    content
      ? `
        <div class="section-title">
          Content
        </div>

        <div class="content">
          ${content}
        </div>
      `
      : ""
  }

</div>

${catalogue ? cataloguePages : ""}

</body>
</html>
`;

  console.log(
    "[RESOURCE PDF] Generating PDF..."
  );

  const { uri } =
    await Print.printToFileAsync({
      html,
    });

  console.log(
    "[RESOURCE PDF] Generated:",
    uri
  );

  return uri;
}

/**
 * Saves a generated PDF to the app's
 * document directory and Android Downloads.
 */
async function savePdfToDownloads(
  pdfUri: string,
  fileName: string
): Promise<string> {
  if (Platform.OS !== "android") {
    return pdfUri;
  }

  const permissions =
    await FileSystem
      .StorageAccessFramework
      .requestDirectoryPermissionsAsync();

  if (!permissions.granted) {
    throw new Error(
      "Permission to save the PDF was not granted."
    );
  }

  const destinationUri =
    await FileSystem
      .StorageAccessFramework
      .createFileAsync(
        permissions.directoryUri,
        fileName,
        "application/pdf"
      );

  const base64 =
    await FileSystem.readAsStringAsync(
      pdfUri,
      {
        encoding:
          FileSystem.EncodingType.Base64,
      }
    );

  await FileSystem
    .StorageAccessFramework
    .writeAsStringAsync(
      destinationUri,
      base64,
      {
        encoding:
          FileSystem.EncodingType.Base64,
      }
    );

  return destinationUri;
}

/**
 * DOWNLOAD
 */
export async function downloadResourcePDF(
  resource: DownloadResource,
  userId: string
): Promise<string | undefined> {
  if (!userId) {
    throw new Error(
      "User is not authenticated."
    );
  }

  console.log(
    "[RESOURCE DOWNLOAD] Starting:",
    resource.title
  );

  const temporaryPdfUri =
    await createResourcePDF(resource);

  const fileName =
    `${sanitizeFileName(
      resource.title
    )}.pdf`;

  const finalUri =
    `${FileSystem.documentDirectory}${fileName}`;

  const existingFile =
    await FileSystem.getInfoAsync(
      finalUri
    );

  if (existingFile.exists) {
    await FileSystem.deleteAsync(
      finalUri,
      { idempotent: true }
    );
  }

  await FileSystem.copyAsync({
    from: temporaryPdfUri,
    to: finalUri,
  });

  let downloadedFileUri =
    finalUri;

  if (Platform.OS === "android") {
    downloadedFileUri =
      await savePdfToDownloads(
        finalUri,
        fileName
      );
  }

  await saveDownloadedResource({
    id: String(resource.id),
    title: resource.title,
    description: resource.description,
    label: resource.label,
    materialType: resource.materialType,
    category:
      resource.category === "Reports"
        ? "Reports"
        : "Educational Materials",
    content:
      isCatalogue(resource) ||
      isExternalLink(resource)
        ? ""
        : resource.content || "",
    fileUri: downloadedFileUri,
    downloadedAt:
      new Date().toISOString(),
    userId,
  });

  console.log(
    "[RESOURCE DOWNLOAD] Complete:",
    downloadedFileUri
  );

  return downloadedFileUri;
}

/**
 * SHARE PDF
 *
 * Generates the same PDF as Download,
 * but opens the native share sheet instead
 * of saving it to Downloads.
 */
export async function shareResourcePDF(
  resource: DownloadResource
): Promise<void> {
  console.log(
    "[RESOURCE SHARE] Creating PDF:",
    resource.title
  );

  const isSharingAvailable =
    await Sharing.isAvailableAsync();

  if (!isSharingAvailable) {
    throw new Error(
      "PDF sharing is not available on this device."
    );
  }

  const temporaryPdfUri =
    await createResourcePDF(resource);

  const fileName =
    `${sanitizeFileName(
      resource.title
    )}.pdf`;

  const shareDirectory =
    `${FileSystem.cacheDirectory}shared-resources/`;

  const directoryInfo =
    await FileSystem.getInfoAsync(
      shareDirectory
    );

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      shareDirectory,
      { intermediates: true }
    );
  }

  const shareUri =
    `${shareDirectory}${fileName}`;

  const existingFile =
    await FileSystem.getInfoAsync(
      shareUri
    );

  if (existingFile.exists) {
    await FileSystem.deleteAsync(
      shareUri,
      { idempotent: true }
    );
  }

  await FileSystem.copyAsync({
    from: temporaryPdfUri,
    to: shareUri,
  });

  console.log(
    "[RESOURCE SHARE] Sharing PDF:",
    shareUri
  );

  await Sharing.shareAsync(
    shareUri,
    {
      mimeType: "application/pdf",
      dialogTitle:
        `Share ${resource.title}`,
      UTI: "com.adobe.pdf",
    }
  );
}
