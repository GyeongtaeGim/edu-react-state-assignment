import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const IndexPage = () => {
  const [value, setValue] = useState(0);

  const handlePlusClick = () => {
    // setValue(value + 1)도 가능 하지만 아래처럼 사용하면 별도로 value를 함수에서 부르지 않아도 돼서 훨씬 로직이 깔끔해진답니다.
    setValue((prev) => prev + 1);
  };

  // 여기에는 어떤 함수를 선언해야할까요?

  return (
    <>
      <Helmet>
        <title>IndexPage</title>
      </Helmet>
      <Stack spacing={1} width="fit-content">
        <Typography variant="h1">지금 값은 {value} 입니다.</Typography>
        <Button variant="contained" onClick={handlePlusClick}>
          이거는 +1 하는 버튼 입니다.
        </Button>
        {/* 여기에는 어떤 함수를 연결해야할까요? */}
        <Button variant="contained">이거는 -1 하는 버튼 입니다.</Button>
      </Stack>
    </>
  );
};

export default IndexPage;
