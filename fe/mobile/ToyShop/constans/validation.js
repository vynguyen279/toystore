import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('Không được để trống!'),
    pass: Yup.string().min(8, 'Phải đủ 8 ký tự!').max(8, 'Chỉ có 8 ký tự!').required('Không được để trống!'),
});

export const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('Không được để trống!'),
    pass: Yup.string().min(8, 'Phải đủ 8 ký tự!').max(8, 'Chỉ có 8 ký tự!').required('Không được để trống!'),
    rePass: Yup.string().min(8, 'Phải đủ 8 ký tự!').max(8, 'Chỉ có 8 ký tự!').required('Không được để trống!'),
});

export const InformationSchema = Yup.object().shape({
    fullName: Yup.string().min(5, 'Quá ngắn!').max(50, 'Quá dài!').required('Không được để trống!'),
    phone: Yup.string().min(10, 'Phải đủ 10 số!').max(10, 'Chỉ có 10 số!').required('Không được để trống!'),
    address: Yup.string().min(10, 'Quá ngắn!').max(50, 'Quá dài!').required('Không được để trống!'),
});

export const ChangePassSchema = Yup.object().shape({
    oldPass: Yup.string().min(8, 'Phải đủ 8 ký tự!').max(8, 'Chỉ có 8 ký tự!').required('Không được để trống!'),
    newPass: Yup.string().min(8, 'Phải đủ 8 ký tự!').max(8, 'Chỉ có 8 ký tự!').required('Không được để trống!'),
    rePass: Yup.string().min(8, 'Phải đủ 8 ký tự!').max(8, 'Chỉ có 8 ký tự!').required('Không được để trống!'),
});
export const UpdateInformationSchema = Yup.object().shape({
    fullName: Yup.string().min(5, 'Quá ngắn!').max(50, 'Quá dài!'),
    phone: Yup.string().min(10, 'Phải đủ 10 số!').max(10, 'Chỉ có 10 số!'),
    email: Yup.string().email('Email không hợp lệ!'),
    address: Yup.string().min(10, 'Quá ngắn!').max(50, 'Quá dài!'),
});

export const GetPassSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('Không được để trống!'),
});
