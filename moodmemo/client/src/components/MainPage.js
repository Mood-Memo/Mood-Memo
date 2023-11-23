import React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: theme.spacing(8),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'grey',
}));

const LeftPanel = styled('div')(({ theme }) => ({
    flex: '0 0 20%',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
}));

const RightPanel = styled('div')(({ theme }) => ({
    flex: '0 0 80%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}));

const UpperRightPanel = styled('div')(({ theme }) => ({
    flex: '0 0 30%',
    flexDirection: 'column',
    alignItems: 'flex-start',
}));

const LowerRightPanel = styled('div')(({ theme }) => ({
    flex: '0 0 70%',
    marginTop: theme.spacing(10),
}));

const ButtonContainer = styled('div')(({ theme }) => ({
    // marginTop: theme.spacing(2), 
}));


export default function Main() {

    const navigate = useNavigate();

    // 로그아웃 핸들러
    const handleLogout = async () => {
        try {
        // 로그아웃 API 호출
        const response = await axios.get('/api/user/logout');

        if (response.data.success) {
            // 로그아웃 성공 시 로그인 페이지로 이동
            navigate('/');

            toast.success('로그아웃되었습니다');  // 팝업창 안뜸

            // 로컬 스토리지에서 토큰 제거
            localStorage.removeItem('token');
        } else {
            // 로그아웃 실패 시 에러 메세지 표시
            toast.error(response.data.message);
        }
        } catch (err) {
        console.error('로그아웃 중 오류:', err);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        MOOD MEMO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Content>
                <LeftPanel>
                    <List component="nav">
                        <ListItemButton component={Link} to="/main">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="HOME" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/my">
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="MY" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/post">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="POST" />
                        </ListItemButton>                       

                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="LOGOUT" />
                        </ListItemButton>
                    </List>
                </LeftPanel>

                <RightPanel>
                    <UpperRightPanel>
                        <TextField
                            id="outlined-multiline-static"
                            label="내용작성"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            style={{ width: '1200px', marginBottom: '16px' }}
                        />

                        <ButtonContainer>
                            <Button variant="contained" color="primary">
                                Post
                            </Button>
                        </ButtonContainer>
                    </UpperRightPanel>

                    <LowerRightPanel>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            width: '1200px', 
                            border: '1px solid black', 
                            borderRadius: '8px' }}>
                            <div style={{ height: '50px', 
                            overflow: 'hidden', 
                            borderRadius: '8px 8px 0 0' }}>
                                <img src="/mm.png" alt="이미지 설명" 
                                style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    objectFit: 'cover',
                                    marginLeft: '15px' }} />
                            </div>

                            <div style={{ padding: '16px', height: '200px' }}>
                                {/* 여기에 데이터베이스에서 가져온 텍스트를 표시할 내용 추가 */}
                                {/* 예시: fetchedText 변수는 데이터베이스에서 가져온 텍스트로 대체되어야 함 */}
                                {/* {fetchedText} */}
                                "오늘은 정말 놀라운 날이었답니다! 저는 다양한 직업을 체험할 수 있는 곳에 갔습니다.
                                의사도 되고, 요리사도 되고, 심지어 건설 노동자도 되고 말았습니다! 저는 이 다양한 역할들을 해보는 것이 너무 즐거웠습니다.
                                의사로서 환자의 맥박을 체크하고 청진기를 사용하는 방법을 배웠는데, 진짜 의사인 척 하면서 사람들의 기분을 좋게 해주는 것이 너무 멋졌습니다.
                                요리사가 되는 것 또한 매우 즐거웠습니다. 저는 맛있는 음식을 요리하고 다양한 새로운 재료들을 먹어보게 되었고, 심지어 요리사의 모자와 앞치마를 입게 되었습니다!
                                마지막으로 건설노동자가 되는 것이 어떤 것인지 체험을 하게 되었고, 블록으로 탑을 쌓을 수 있도록 도왔고, 망치와 못을 사용하게 되었습니다. 힘든 일이었지만 매 순간이 너무 좋았습니다.
                                저는 오늘 다양한 직업에 대해 너무 많이 배웠고 다음에는 어떤 경험을 하게 될지 기대가 됩니다."
                            </div>
                        </div>
                    </LowerRightPanel>
                </RightPanel>
            </Content>
        </div>
    );
}
