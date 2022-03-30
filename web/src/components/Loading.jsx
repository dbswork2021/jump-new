import 'assets/css/loading.css';
import { LoadingOutlined } from '@ant-design/icons';
export default function Loading() {
  return (
    <div className="loading">
      <LoadingOutlined style={{ color: '#40a9ff', fontSize: '80px' }} />
    </div>
  );
}
