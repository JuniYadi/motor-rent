import { Helmet } from "react-helmet-async";
import { APP_NAME } from "../../statics";

export default function About() {
  return (
    <>
      <Helmet>
        <title>{`About - ${APP_NAME}`}</title>
      </Helmet>
      <h3>About</h3>
      <p>
        Project ini dibuat untuk memenuhi tugas mata kuliah{" "}
        <b>Teknologi Cloud Computing</b> dengan dosen pengampu{" "}
        <b>INDRA BUDI T., ST., M.KOM </b> pada semester <b>GASAL (2023-2024)</b>{" "}
        di <b>Universitas Widya Kartika (Surabaya, Jawa Timur, Indonesia)</b>.
      </p>
      <h3>Tujuan Project</h3>
      <p>
        <ul>
          <li>
            Membuat aplikasi catatan sederhana yang dapat digunakan oleh
            pengguna untuk membuat catatan.
          </li>
          <li>
            Memanfaatkan teknologi cloud untuk membuat aplikasi catatan
            sederhana.
          </li>
          <li>
            Mampu menghandle request yang masuk ke aplikasi dengan baik dan
            ketika load aplikasi meningkat, aplikasi tetap dapat berjalan dengan
            baik.
          </li>
        </ul>
      </p>

      <h3>Tech Stack Project</h3>
      <p>
        Project ini dibuat menggunakan gabungan dari berbagai teknologi berbasis
        cloud, yaitu:
      </p>
      <p>
        <b>Domain</b>
        <ul>
          <li>CloudFlare (Sebagai DNS)</li>
        </ul>
      </p>
      <p>
        <b>Authentikasi</b>
        <ul>
          <li>AWS Cognito</li>
        </ul>
      </p>
      <p>
        <b>Frontend</b>
        <ul>
          <li>AWS CloudFront (Sebagai CDN)</li>
          <li>AWS S3 (Sebagai Storage)</li>
          <li>AWS Certificate Manager (Sebagai Penyedia SSL)</li>
          <li>Vite + ReactJS (Sebagai Engine Utama)</li>
        </ul>
      </p>
      <p>
        <b>Backend</b>
        <ul>
          <li>AWS API Gateway (Sebagai Management API)</li>
          <li>AWS Lambda (Serverless Computing)</li>
          <li>AWS DynamoDB (Database Cloud Computing) [NoSQL]</li>
          <li>AWS Certificate Manager (Sebagai Penyedia SSL)</li>
          <li>Python (Sebagai Engine Utama)</li>
          <li>Chalice Framework (Sebagai Deployer Lambda)</li>
        </ul>
      </p>
      <p>
        <b>Monitoring</b>
        <ul>
          <li>AWS CloudWatch (Sebagai Monitoring)</li>
        </ul>
      </p>
      <p>
        <b>Testing</b>
        <ul>
          <li>Postman (Sebagai API Tester)</li>
        </ul>
      </p>
      <p>
        <b>Version Control</b>
        <ul>
          <li>Git</li>
          <li>GitHub</li>
        </ul>
      </p>
      <p>
        <b>Deployment</b>
        <ul>
          <li>GitHub Actions</li>
        </ul>
      </p>
    </>
  );
}
