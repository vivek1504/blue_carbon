const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Carbon Admin</h3>
                                <p className="text-gray-400 text-sm">Environmental Project Management</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Empowering sustainable environmental projects through innovative carbon management solutions. 
                            Join us in building a greener future, one project at a time.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.219-.219-.219-1.098c0-1.028.6-1.797 1.358-1.797.64 0 .958.48.958 1.058 0 .64-.219 1.438-.359 2.237-.199.958.48 1.797 1.438 1.797 1.797 0 2.994-2.237 2.994-4.834 0-1.998-1.358-3.556-3.676-3.556-2.636 0-4.274 1.937-4.274 4.093 0 .759.29 1.279.699 1.678.08.08.08.159.08.239-.08.319-.239 1.018-.279 1.158-.08.199-.239.239-.439.159-1.279-.6-1.797-2.157-1.797-3.916 0-2.994 2.077-6.312 6.312-6.312 3.317 0 5.555 2.397 5.555 4.973 0 3.317-1.918 5.794-4.694 5.794-.959 0-1.838-.52-2.118-1.158 0 0-.52 2.037-.639 2.397-.24.959-.679 1.797-1.078 2.476.878.279 1.797.439 2.796.439 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Project Management</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reports</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">User Management</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status Page</a></li>
                        </ul>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="py-8 border-t border-gray-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold text-green-400">2,847</div>
                            <div className="text-gray-400 text-sm">Projects Approved</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-400">15.2M</div>
                            <div className="text-gray-400 text-sm">Carbon Credits Issued</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-400">98.5%</div>
                            <div className="text-gray-400 text-sm">System Uptime</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-400">247</div>
                            <div className="text-gray-400 text-sm">Active NGOs</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2024 Carbon Admin. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>

                {/* Environmental Badge */}
                <div className="py-4 border-t border-gray-800">
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2 text-green-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span className="text-sm">This platform runs on 100% renewable energy</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;