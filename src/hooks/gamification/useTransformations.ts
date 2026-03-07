import { useState, useEffect } from 'react';
import SweetyBefore from '@/assets/Sweety_before.jpg';
import SweetyAfter from '@/assets/Sweety_after.jpg';
import ManilaBefore from '@/assets/Manila bishnoi_before (1).jpg';
import ManilaAfter from '@/assets/Manila bishnoi_after (1).jpg';
import RashmiBefore from '@/assets/Rashmi Aghor_before (2).jpg';
import RashmiAfter from '@/assets/Rashmi Aghor_after (2).jpg';
import SamapikaBefore from '@/assets/Samapika Das_before.jpg';
import SamapikaAfter from '@/assets/Samapika Das_after.jpg';
import MinaBefore from '@/assets/Mina_before.jpg';
import MinaAfter from '@/assets/Mina_after.jpg';
import PriyaBefore from '@/assets/Priya_before.jpg';
import PriyaAfter from '@/assets/Priya_after.jpg';
import AditiBefore from '@/assets/Aditi_before.jpg';
import AditiAfter from '@/assets/Aditi_after.jpg';
import VijayBefore from '@/assets/Vijay_before.jpg';
import VijayAfter from '@/assets/Vijay_after.jpg';

export interface Transformation {
  id: string;
  user_id: string;
  before_image_url: string;
  after_image_url: string;
  submission_status: 'submitted' | 'approved' | 'rejected';
  points_awarded: number;
  created_at: string;
  profiles?: {
    full_name?: string;
  };
  before_weight?: number;
  after_weight?: number;
  is_demo?: boolean;
  demo_user_name?: string;
}

// Demo data for transformations - using real client data
const demoTransformations: Transformation[] = [
  {
    id: 'sweety-1',
    user_id: 'sweety',
    before_image_url: SweetyBefore,
    after_image_url: SweetyAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Sweety',
    before_weight: 65,
    after_weight: 60,
  },
  {
    id: 'manila-1',
    user_id: 'manila',
    before_image_url: ManilaBefore,
    after_image_url: ManilaAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Manila Bishnoi',
    before_weight: 68,
    after_weight: 62,
  },
  {
    id: 'rashmi-1',
    user_id: 'rashmi',
    before_image_url: RashmiBefore,
    after_image_url: RashmiAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Rashmi Aghor',
    before_weight: 73.4,
    after_weight: 62,
  },
  {
    id: 'samapika-1',
    user_id: 'samapika',
    before_image_url: SamapikaBefore,
    after_image_url: SamapikaAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Samapika Das',
    before_weight: 63.8,
    after_weight: 60,
  },
  {
    id: 'mina-1',
    user_id: 'mina',
    before_image_url: MinaBefore,
    after_image_url: MinaAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Mina',
    before_weight: 73,
    after_weight: 60,
  },
  {
    id: 'priya-1',
    user_id: 'priya',
    before_image_url: PriyaBefore,
    after_image_url: PriyaAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Priya',
    before_weight: 69,
    after_weight: 60,
  },
  {
    id: 'aditi-1',
    user_id: 'aditi',
    before_image_url: AditiBefore,
    after_image_url: AditiAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Aditi',
    before_weight: 68,
    after_weight: 60,
  },
  {
    id: 'vijay-1',
    user_id: 'vijay',
    before_image_url: VijayBefore,
    after_image_url: VijayAfter,
    submission_status: 'approved',
    points_awarded: 5000,
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_user_name: 'Vijay',
    before_weight: 69,
    after_weight: 60,
  },
];

export function useTransformations() {
  const [approvedTransformations, setApprovedTransformations] = useState<Transformation[]>([]);
  const [userTransformations, setUserTransformations] = useState<Transformation[]>([]);
  const [isLoadingApproved, setIsLoadingApproved] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    // Simulate loading approved transformations
    setTimeout(() => {
      console.log('Loading transformations:', demoTransformations.length, 'items');
      demoTransformations.forEach((t, i) => {
        console.log(`${i + 1}. ${t.demo_user_name} - ${t.before_weight}kg → ${t.after_weight}kg`);
      });
      setApprovedTransformations(demoTransformations);
      setIsLoadingApproved(false);
    }, 500);

    // Simulate loading user transformations (empty for now)
    setTimeout(() => {
      setUserTransformations([]);
      setIsLoadingUser(false);
    }, 500);
  }, []);

  return {
    approvedTransformations,
    userTransformations,
    isLoadingApproved,
    isLoadingUser,
  };
}
