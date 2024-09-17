import { FC } from "react"

//Outletをインポート
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
    return (
        <>
            <header>
                ヘッダー
            </header>

            //ここが切り替わる
            <Outlet />

            <footer>
                フッター
            </footer>
        </>
    )

}
export default Layout;