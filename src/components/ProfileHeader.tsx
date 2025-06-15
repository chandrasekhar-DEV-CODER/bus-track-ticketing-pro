
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    collegeId?: string;
    studentId?: string;
    memberSince?: string;
  };
  college?: {
    name: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, college }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardContent className="p-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-red-500 text-white text-xl font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {user.name}
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {user.email}
          </p>
          
          {college && (
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <p className="font-medium">{college.name}</p>
            </div>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            {user.studentId && <p>ID: {user.studentId}</p>}
            {user.memberSince && <p>Member since {user.memberSince}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;
