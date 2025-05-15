document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initSidebar();
    initModules();
    initTabs();
    initDropdowns();
    initModal();
});

// Sidebar functionality
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    // Toggle sidebar on mobile
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            !sidebarToggle.contains(event.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Module switching functionality
function initModules() {
    const travelTab = document.getElementById('travel-tab');
    const serviceTab = document.getElementById('service-tab');
    const coachingTab = document.getElementById('coaching-tab');
    
    const travelModule = document.getElementById('travel-module');
    const serviceModule = document.getElementById('service-module');
    const coachingModule = document.getElementById('coaching-module');
    
    const moduleTitle = document.getElementById('module-title');
    const addNewBtn = document.getElementById('add-new-btn');
    const modalTitle = document.getElementById('modal-title');
    
    // Set active module
    function setActiveModule(module, title, modalTitleText) {
        // Hide all modules
        travelModule.classList.remove('active');
        serviceModule.classList.remove('active');
        coachingModule.classList.remove('active');
        
        // Remove active class from all tabs
        travelTab.classList.remove('active');
        serviceTab.classList.remove('active');
        coachingTab.classList.remove('active');
        
        // Show selected module
        module.classList.add('active');
        
        // Update module title
        moduleTitle.textContent = title;
        
        // Update modal title
        modalTitle.textContent = modalTitleText;
    }
    
    // Event listeners for module tabs
    travelTab.addEventListener('click', function() {
        setActiveModule(travelModule, 'Travel Management CRM', 'Add New Client');
        travelTab.classList.add('active');
    });
    
    serviceTab.addEventListener('click', function() {
        setActiveModule(serviceModule, 'Service Provider CRM', 'Add New Project');
        serviceTab.classList.add('active');
    });
    
    coachingTab.addEventListener('click', function() {
        setActiveModule(coachingModule, 'Coaching Institute CRM', 'Add New Student');
        coachingTab.classList.add('active');
    });
}

// Tab switching functionality
function initTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // Get parent tabs container
            const tabsContainer = this.closest('.tabs');
            
            // Get tab content id
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all triggers in this container
            tabsContainer.querySelectorAll('.tab-trigger').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked trigger
            this.classList.add('active');
            
            // Hide all tab contents in this container
            tabsContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const tabContent = document.getElementById(tabId + '-tab');
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// Dropdown functionality
function initDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Get parent dropdown
            const dropdown = this.closest('.dropdown');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}

// Modal functionality
function initModal() {
    const addNewBtn = document.getElementById('add-new-btn');
    const modal = document.getElementById('add-new-modal');
    const modalClose = modal.querySelector('.modal-close');
    
    // Open modal
    addNewBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking on overlay
    modal.querySelector('.modal-overlay').addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Prevent modal close when clicking on modal content
    modal.querySelector('.modal-container').addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}