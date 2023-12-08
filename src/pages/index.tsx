import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";

interface UserFormCommon {
  name: string;
  location: "internal" | "external";
  email: string;
  password: string;
}

const LOCATION_DETAILS = ["수도권", "광역시", "비수도권"] as const;

interface ExternalForm extends UserFormCommon {
  location: "external";
}
interface InternalForm extends UserFormCommon {
  location: "internal";
  locationDetail: (typeof LOCATION_DETAILS)[number];
}

type UserForm = InternalForm | ExternalForm;

const IndexPage = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    resetField,
    watch,
  } = useForm<UserForm>({
    mode: "onChange",
  });

  const location = watch("location");

  const handleFormSubmit = handleSubmit((data) => {
    if (data.location === "external") {
      console.log("외국이라서 상세 데이터는 없어요.", data);
      return;
    }
    console.log("국내라서 상세 데이터가 있네요.", data);
  });

  return (
    <>
      <Helmet>
        <title>IndexPage</title>
      </Helmet>
      <Stack
        onSubmit={handleFormSubmit}
        direction="column"
        spacing={2}
        maxWidth={540}
        component="form"
      >
        <TextField
          label="이름"
          placeholder="이름을 입력해주세요."
          {...register("name", {
            minLength: {
              message: "이름의 최소 길이는 3자 이상입니다.",
              value: 3,
            },
          })}
          helperText={errors.name?.message}
          error={!!errors.name?.message}
        />
        <Controller
          control={control}
          name="location"
          defaultValue="internal"
          rules={{
            onChange: (e) => {
              // 초기화를 안해주면 외국임에도 이전에 선택한 locationDetail이 상태에 잡힙니다.
              // 그러나 굳이 초기화하지 않아요. 그냥 handleFormSubmit에서 제외하는 편입니다.
              if (e.target.value === "external") {
                resetField("locationDetail");
              }
            },
          }}
          render={({ field }) => (
            <FormControl>
              <FormLabel>거주 지역</FormLabel>
              <RadioGroup {...field}>
                <FormControlLabel
                  label="내국"
                  value="internal"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="외국"
                  value="external"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        {location === "internal" && (
          <Controller
            control={control}
            name="locationDetail"
            defaultValue="광역시"
            render={({ field }) => (
              <FormControl>
                <FormLabel>지역 상세</FormLabel>
                <RadioGroup {...field}>
                  {LOCATION_DETAILS.map((detail) => (
                    <FormControlLabel
                      key={detail}
                      label={detail}
                      control={<Radio value={detail} />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        )}
        <TextField
          autoComplete="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register("email")}
        />
        <TextField
          type="password"
          autoComplete="passowrd"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          {...register("password")}
        />
        <Button type="submit">보내기</Button>
      </Stack>
    </>
  );
};

export default IndexPage;
