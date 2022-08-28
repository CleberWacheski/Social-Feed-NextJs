import style from './style.module.css'

interface avatarProps {
    src : string;
    alt: string;
    className: 'avatarForPost' | 'avatarForSidebar' | 'avatarforComment' | 'AvatarForUserPage';
}

export function Avatar ({src,alt,className} : avatarProps) {

    return (
        <img 
            src={src}
            className={style[className]}
            alt={alt}
        />
    )
}