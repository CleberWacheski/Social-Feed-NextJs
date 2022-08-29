import Image from 'next/image';

interface avatarProps {
    src : string;
    alt: string;
    className: 'avatarForPost' | 'avatarForSidebar' | 'avatarforComment' | 'AvatarForUserPage';
}

export function Avatar ({src,alt,className} : avatarProps) {

    switch (className) {
        case ('avatarForPost' || 'AvatarForUserPage') : 
        return (
            <Image 
                src={src}
                alt={alt}
                width='80'
                height='80'
                style={{
                   borderRadius:'8px',
                   borderWidth: '2px',
                   borderColor: '#29354B',
                   borderStyle : 'solid',
                }}
                
            />
        )
        break
        case ('avatarforComment') : 
        return (
            <Image 
                src={src}
                alt={alt}
                width='80'
                height='80'
                style={{
                    borderRadius:'8px',
                    objectFit:'cover'
                }}
                
            />
        )
        break
        case ('avatarForSidebar') : 
        return (
            <Image 
                src={src}
                alt={alt}
                width='100'
                height='100'
                style={{    
                    borderRadius:'8px',
                    borderColor: 'blue',
                    borderStyle : '#A0C8C3',
                    borderWidth: '3px',
                    objectFit:'cover',
                }}  
            />
        )
        break
        default :
        return (
            <Image 
                src={src}
                alt={alt}
                width='80'
                height='80'
                style={{
                   borderRadius:'8px',
                   borderWidth: '2px',
                   borderColor: '#29354B',
                   borderStyle : 'solid',
                }}
                
            />
        )
    }   

    
}