import Analytics from './components/postgame/analytics/analytics.jsx';
import Header from './components/postgame/header/header.jsx';
import History from './components/postgame/history/history.jsx';

import styles from '../styles/PostGame.module.scss';

export default function PostGame() {
  return (
    <div className={styles.container}>
      <Header />
      <Analytics
        startDate={'10.23.2022'}
        endDate={'10.24.2022'}/>
      <History />
    </div>
  )
}
