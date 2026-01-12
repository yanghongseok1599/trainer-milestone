"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowLeft,
  Users,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Phone,
  User,
  FileText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";