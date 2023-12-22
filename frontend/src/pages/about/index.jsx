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
        Project ini dibuat untuk memenuhi tugas mata kuliah:
        <ul>
          <li>
            <b>Analisa dan Desain Sistem (ADS)</b> dengan dosen pengampu{" "}
            <b>INDRA BUDI T., ST., M.KOM</b>
          </li>
          <li>
            <b>Sistem Informasi (SI)</b> dengan dosen pengampu{" "}
            <b>YONATAN WIDIANTO, S.Kom., M.Kom.</b>
          </li>
          <li>
            <b>SISTEM BASIS DATA (SBD)</b> dengan dosen pengampu{" "}
            <b>ROBBY KURNIAWAN BUDHI, S.Kom., M.Kom.</b>
          </li>
        </ul>
        pada semester <b>GASAL (2023-2024)</b> di{" "}
        <b>Universitas Widya Kartika (Surabaya, Jawa Timur, Indonesia)</b>.
      </p>
      <h3>Tujuan Project</h3>
      <p>
        <ul>
          <li>
            Mengembangkan Aplikasi yang User-Friendly: Membuat aplikasi yang
            intuitif, mudah digunakan, dan dapat diakses oleh berbagai jenis
            pengguna, termasuk mereka yang kurang berpengalaman dalam teknologi.
          </li>
          <li>
            Mengelola Ketersediaan Motor: Memastikan bahwa motor tersedia dalam
            jumlah yang mencukupi untuk memenuhi permintaan pelanggan, terutama
            di area yang ramai.
          </li>
          <li>Meningkatkan Keamanan dan Kepercayaan</li>
          <li>Memperluas Cakupan Area</li>
          <li>Meningkatkan Efisiensi Operasional</li>
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
