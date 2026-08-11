import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export async function downloadResourcePDF(resource: {
  title: string;
  label: string;
  materialType: string;
  description: string;
  content: string;
}) {
  const html = `
  <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body{
          font-family: Arial, Helvetica, sans-serif;
          padding:32px;
          line-height:1.6;
          color:#333;
        }

        h1{
          color:#35408E;
        }

        .badge{
          display:inline-block;
          background:#EEF3FF;
          color:#35408E;
          padding:6px 12px;
          border-radius:8px;
          margin-right:8px;
        }
      </style>
    </head>

    <body>
      <h1>${resource.title}</h1>

      <div>
        <span class="badge">${resource.label}</span>
        <span class="badge">${resource.materialType}</span>
      </div>

      <h2>Description</h2>
      <p>${resource.description}</p>

      <h2>Content</h2>
      <p>${resource.content.replace(/\n/g, "<br/>")}</p>
    </body>
  </html>
  `;

  // Generate the PDF
  const { uri } = await Print.printToFileAsync({
    html,
  });

  if (Platform.OS === "android") {
  const permissions =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (!permissions.granted) {
    return;
  }

  const pdfName =
    resource.title.replace(/[^a-z0-9]/gi, "_") + ".pdf";

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const fileUri =
    await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      pdfName,
      "application/pdf"
    );

  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return fileUri;
} else {
  // iOS
  await Sharing.shareAsync(uri);
  return uri;
}

}